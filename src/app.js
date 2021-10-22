import 'material-design-icons/iconfont/material-icons.css';
import './scss/main.scss';
import { Gallery } from './js/gallery';

const gallery = new Gallery({ root: 'body' });
gallery.createMarkup();
gallery.setEvent();
