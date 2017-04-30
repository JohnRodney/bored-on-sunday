import { mount } from 'react-mounter';
import home from '../imports/ui/home';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(home);
  },
});
