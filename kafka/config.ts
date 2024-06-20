import { Consumer, Kafka, Producer } from 'kafkajs';

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    constructor() {
        this.kafka = new Kafka({
            clientId: 'nodejs-kafka',
            brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async produce(topic: string, messages: any) {
        try {
            await this.producer.connect();
            await this.producer.send({
                topic: topic,
                messages: messages,
            });
        } catch (error) {
            console.error(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic: string, callback: Function) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value!.toString();
                    callback(value);
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default KafkaConfig;
