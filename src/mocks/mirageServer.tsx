import { Server } from 'miragejs';

const sum = (arr: number[]) => arr.reduce((x, y) => x + y);
const normalize = (arr: number[]) => {
  const factor = 1.0 / sum(arr);
  return arr.map(x => factor * x);
}

const probs = normalize([0.0753362838013259, 1.19893463598376682, 0.0798603538584275, 5.061255409103740124, 4.12040283375409261, 0.10426414060055768, 1.15884397185836902, 0.20110237103972042]);

export function makeServer({ environment = 'development' } = {}): Server {
  let server = new Server({
    environment,
    routes() {
      this.namespace = '/api';
      this.get('/predict', () => {
        return { score: probs, predictedLabel: 'Round'};
      });

      // Fallback in the default case
      this.passthrough();
    },
  });

  return server;
}
