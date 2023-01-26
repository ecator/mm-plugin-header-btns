import { Client4 } from 'mattermost-redux/client';
import { GlobalState } from 'mattermost-redux/types/store';
import { getConfig } from 'mattermost-redux/selectors/entities/general';
import manifest from '../manifest';
import { PluginConfig } from 'types/plugin';

export const getPluginConfig = async (state: GlobalState): Promise<PluginConfig> => {
    let url = getPluginServerRoute(state) + "/config";
    let response = await doGet(url);
    let json = await response.json();
    let urls = String(json['urls']).split('\n');
    let titles = String(json['titles']).split('\n');
    let icons = String(json['icons']).split('\n');
    let pluginConfig: PluginConfig = {
        urls: [],
        icons: [],
        titles: []
    }
    // console.log(json,urls,icons,titles);
    for (let i = 0; i < urls.length; i++) {
        let url = urls[i];
        let icon = i < icons.length ? icons[i] : findDefault('icons');
        let title = i < titles.length ? titles[i] : urls[i];
        if (url == "" || icon == "" || title == "") {
            continue;
        }
        pluginConfig.urls.push(url);
        pluginConfig.icons.push(icon);
        pluginConfig.titles.push(title);
    }
    if (pluginConfig.urls.length == 0) {
        pluginConfig.urls.push(findDefault('urls'));
        pluginConfig.icons.push(findDefault('icons'));
        pluginConfig.titles.push(findDefault('titles'));
    }
    return pluginConfig;
}



/**
 * request with get method
 *
 * @param {string} url
 * @param {object} [options={}]
 * @return {Promise<Response>}  Response
 */
async function doGet(url: string, options: object = {}): Promise<Response> {
    return fetch(url, Client4.getOptions(options));
}

/**
 * find default value from plugin.json
 *
 * @param {string} key
 * @return {string} value
 */
function findDefault(key: string): string {
    let value = "";
    for (let item of manifest.settings_schema.settings) {
        if (item.key == key) {
            value = item.default;
            break;
        }
    }
    return value;
}


/**
 * calculate the current plugin api root path such as baseurl/plugin/pluginid
 *
 * @param {GlobalState} state
 * @return {string}  url
 */
function getPluginServerRoute(state: GlobalState): string {
    const config = getConfig(state);
    let basePath = '';
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;

        if (basePath && basePath[basePath.length - 1] === '/') {
            basePath = basePath.substring(0, basePath.length - 1);
        }
    }
    return basePath + '/plugins/' + manifest.id;
}