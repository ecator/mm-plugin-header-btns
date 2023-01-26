import { Store, Action } from 'redux';
import { GlobalState } from 'mattermost-redux/types/store';
import React from 'react';
import manifest from './manifest';

// eslint-disable-next-line import/no-unresolved
import { PluginRegistry } from './types/mattermost-webapp';
import { getPluginConfig } from 'client';
import { Icon } from 'component/icon';

export default class Plugin {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        const pluginConfig = await getPluginConfig(store.getState());
        // console.log(pluginConfig);
        const SIZE = '18px';
        for (let i = 0; i < pluginConfig.urls.length; i++) {
            registry.registerChannelHeaderButtonAction(<Icon icon={pluginConfig.icons[i]} url={pluginConfig.urls[i]} title={pluginConfig.titles[i]} heght={SIZE} width={SIZE} />
                , () => window.open(pluginConfig.urls[i])
                , pluginConfig.titles[i]
                , pluginConfig.titles[i]);
        }
    }
}

declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(manifest.id, new Plugin());
