module.exports = {
    port: 3131,
    NorthwindServiceBaseUrl: 'http://localhost:10961',
    updateEventsEndpointUrl: '/entityUpdateEvents',
    useSignalRPublishing: false,
    inProcessDatabase: {
        enable: false,
        wcfBackendService: false
    },
    maxEventsReconnectCount: 5,
    supportedLocals: ['en', 'zh-cn', 'zh-tw'],
    others: ''
}