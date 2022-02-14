import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import generated from './generated-menus';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages, utilities, other, ...generated]
};

export default menuItems;
