import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  vus: 1,
  duration: '10s',
  insecureSkipTLSVerify: true,
};

// Define custom counters
const successCount = new Counter('success_count');
const failureCount = new Counter('failure_count');

// Read custom header value from command line parameters
const customHeaderValue = __ENV.CUSTOM_HEADER || '111';

export default function () {
  const params = {
    headers: {
      'custom-header': customHeaderValue,
    },
  };

  const res = http.get('https://httpbin-global-ratelimit.localhost.direct/headers', params);

  // Check if the response status is 200
  const success = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  if (success) {
    console.log('200');
    successCount.add(1); // Increment success counter
  } else {
    console.log(res.status);
    failureCount.add(1); // Increment failure counter
  }

  sleep(0.5);
}

export function handleSummary(data) {
  // Access custom metric values from data.metrics
  const successes = data.metrics.success_count ? data.metrics.success_count.values.count : 0;
  const failures = data.metrics.failure_count ? data.metrics.failure_count.values.count : 0;

  return {
    stdout: `Success count: ${successes}\nFailure count: ${failures}\n`,
  };
}
