import 'material-design-icons/iconfont/material-icons.css';
import './scss/main.scss';
import { Gallery } from './js/gallery';

const gallery = new Gallery({ root: 'main' });
gallery.createMarkup();
gallery.setEvent();
