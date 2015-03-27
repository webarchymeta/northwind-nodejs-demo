module.exports = {
    port: 10961,
    NorthwindServiceBaseUrl: 'http://localhost:10961',
    updateEventsEndpointUrl: '/entityUpdateEvents',
    useSignalRPublishing: false,
    inProcessDatabase: {
        enable: true
    },
    maxEventsReconnectCount: 5,
    supportedLocals: ['en'],
    maxClientConnections: 100,
    others: ''
}