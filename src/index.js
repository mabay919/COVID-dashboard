import './styles/reset.css';
import './styles/bootstrap.min.css';
import './global-casses';
import './by-casses';
import './data';

import './styles/map-styles.css';
import './index-map';

import './styles/death_block.css';
import { deathBlock, healsBlock } from './death_health_block';
import getCountry from './disease-graph';
import { fullSizeBlock, hideSizeButton } from './size-buttons';

deathBlock();
healsBlock();
getCountry();
fullSizeBlock();
hideSizeButton();
