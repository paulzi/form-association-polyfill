import 'form-extra-events/with-shims';
import closest  from 'polyshim/shim/closest';
import Event    from 'polyshim/shim/event';
import Polyfill from './src';

Polyfill.setShim(closest, Event);

export default Polyfill;
