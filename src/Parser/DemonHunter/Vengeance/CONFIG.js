import React from 'react';

import { Mamtooth } from 'CONTRIBUTORS';
import SPECS from 'Game/SPECS';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';

import CHANGELOG from './CHANGELOG';

const textAlignStyle = {
  textAlign: 'center',
};

export default {
  // The people that have contributed to this spec recently. People don't have to sign up to be long-time maintainers to be included in this list. If someone built a large part of the spec or contributed something recently to that spec, they can be added to the contributors list.
  contributors: [Mamtooth],
  // The WoW client patch this spec was last updated to be fully compatible with.
  patchCompatibility: '8.0.1',
  // Explain the status of this spec's analysis here. Try to mention how complete it is, and perhaps show links to places users can learn more.
  // If this spec's analysis does not show a complete picture please mention this in the `<Warning>` component.
	description: (
		<React.Fragment>
			Hi there fellow Illidari. I've put some time in developing this tool for all Vengeance Demon Hunters and I'll always try to keep this spec update. But as you might have thought, you opinion and suggestion is always great to make me improve it more and more for you. So, if you ever have anything to say, please leave a message in some channel that I'll be specifically showing to you later.<br /><br />

			You might have noticed that most of the suggestions focus mostly on improvements of you cast efficiency. This might seem silly and simple to analyze, but it's actually one of the most important things for us Vengeance Demon Hunters. As you also might have noticed, the Vengeance spec uses a leather armor, which gives us less armor than plate users and making us more vulnerable to physical damage. But we also have the <SpellLink id={SPELLS.DEMON_SPIKES.id} /> and <SpellLink id={SPELLS.METAMORPHOSIS_TANK.id} /> to help mitigating this extra incoming damage.<br /><br />

			Also, I have implemented a pain chart tracker. It makes more visual to see if you are capping and wasting too much pain during the fight. It also shows the pain gained/spent breakdown for each of your abilities that you've used in each fight. In my opinion, this is the core of the Vengeance spec analyzer, because resource management is always the decisive point between wiping your group or using a defensive cooldown to avoid it. As you might have experimented, this is one of the hardest things to improve and to master. My desire is to make  this easier for you with this feature.<br /><br />

			If you have any more questions about Demon Hunters, feel free to pay a visit to <a href="https://discord.gg/zGGkNGC" target="_blank" rel="noopener noreferrer">The Fel Hammer Discord</a>, if it's about a general tanking issue, there's also the <a href="https://discord.gg/j9Q5cy7" target="_blank" rel="noopener noreferrer">Tank Chat Discord</a> but if you'd like to discuss anything related to this analyzer, leave a message on GitHub issue or message @Mamtooth on WoWAnalyzer Discord.<br /><br />

			<p style={textAlignStyle}>NOW YOU ARE PREPARED!</p><br /><br />
		</React.Fragment>
	),
  // A recent example report to see interesting parts of the spec. Will be shown on the homepage.
  exampleReport: '/report/p7LdrP8JXZqMNmaC/12-Mythic+Aggramar+-+Kill+(6:09)/4-Munkky',

  // Don't change anything below this line;
  // The current spec identifier. This is the only place (in code) that specifies which spec this parser is about.
  spec: SPECS.VENGEANCE_DEMON_HUNTER,
  // The contents of your changelog.
  changelog: CHANGELOG,
  // The CombatLogParser class for your spec.
  parser: () => import('./CombatLogParser' /* webpackChunkName: "DemonHunter" */).then(exports => exports.default),
  // The path to the current directory (relative form project root). This is used for generating a GitHub link directly to your spec's code.
  path: __dirname,
};
