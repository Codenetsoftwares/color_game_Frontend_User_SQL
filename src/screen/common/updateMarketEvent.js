

const eventSource = new EventSource('http://localhost:7000/events');

const updateMarketEventEmitter = () => {
    console.log("updatemarketEventemitter")
    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('Message from server:', data);

    };
    eventSource.onerror = (err) => {
        console.error('EventSource failed:', err);
        eventSource.close();
    }
}
export default updateMarketEventEmitter;