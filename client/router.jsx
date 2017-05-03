import { mount } from 'react-mounter';
import home from '../imports/ui/home';
import Routes from '../imports/api/collections/routes/collection';

Meteor.subscribe('routes', () => {
  const route = Routes.find({ name: window.location.pathname }).fetch().pop();
  mount(home, { components: route ? route.components : [], css: route ? route.css : [] });
});

