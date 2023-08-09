import {
  useEffect
} from 'react';
import {
  Banner,
  reactExtension,
  useTarget
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.cart-line-item.render-after',
  () => <Extension />,
);

/**
 * Sets a promise for other executions to wait for, or simply return the already
 * set promise.
 *
 * @return <Promise> Promise to wait for until the HTTP response is retrieved.
 */
function getHttpResonse() {
  // Use `self` to assign this promise so it's shared among other executions.
  if (self.httpResponsePromise) {
    return self.httpResponsePromise;
  }

  self.httpResponsePromise = makeHttpRequest();
  return self.httpResponsePromise;
}

/**
 * Makes an actual HTTP request to some endpoint.
 *
 * @return <string> HTTP response.
 */
function makeHttpRequest() {
  return new Promise((resolve) => {
    // Initentionally wait for 10 seconds to simulate the HTTP call.
    console.log('Making an HTTP request...');
    setTimeout(() => {
      console.log('HTTP request done!');

      resolve('This is the http response');
    }, 10000);
  });
}

function Extension() {
  // This will be unique for each cart line item.
  const cartLineItem = useTarget();

  useEffect(() => {
    // Calling `getHttpResponse` inside async function so
    // you can `await` for it.
    const fetchData = async () => {
      console.log(`[${cartLineItem.id}] Waiting for getHttpResonse...`);
      const response = await getHttpResonse();
      console.log(`[${cartLineItem.id}] Done: response=${response}`);
    };
    fetchData()
      .catch(console.error);
  }, []);

  return (
    <Banner status="critical">
      This is an example banner.
    </Banner>
  );
}
