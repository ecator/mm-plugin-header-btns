export interface PluginRegistry {
    registerPostTypeComponent(typeName: string, component: React.ElementType)
    registerChannelHeaderButtonAction(icon: React.ReactNode | React.ElementType, action: (...args: any) => void, dropdownText: string, tooltipText: string)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}
