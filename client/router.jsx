import { mount } from 'react-mounter';
import editor from '../imports/ui/editor';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(editor);
  },
});
