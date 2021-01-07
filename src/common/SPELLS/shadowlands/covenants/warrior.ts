const covenants = {
  //region Kyrian
  SPEAR_OF_BASTION: {
    id: 307865,
    name: 'Spear of Bastion',
    icon: 'ability_bastion_warrior',
  },
  //endregion

  //region Necrolord
  CONQUERORS_BANNER: {
    id: 324143,
    name: 'Conqueror\'s Banner',
    icon: 'ability_maldraxxus_warriorplantbanner',
  },
  //endregion

  //region Night Fae
  ANCIENT_AFTERSHOCK: {
    id: 325886,
    name: 'Ancient Aftershock',
    icon: 'ability_ardenweald_warrior',
  },
  //endregion

  //region Venthyr
  //Similar to execute, condemn has multiple spell IDs for specs and talents

  //Arms/Prot
  CONDEMN: {
    id: 317349,
    name: 'Condemn',
    icon: 'ability_revendreth_warrior',
  },
  //Arms/Prot and Massacre talent
  CONDEMN_MASSACRE: {
    id: 330334,
    name: 'Condemn',
    icon: 'ability_revendreth_warrior',
  },

  //Fury
  CONDEMN_FURY: {
    id: 317485,
    name: 'Condemn',
    icon: 'ability_revendreth_warrior',
  },
  // Fury and Massacre talent
  CONDEMN_FURY_MASSACRE: {
    id: 330325,
    name: 'Condemn',
    icon: 'ability_revendreth_warrior',
  },
  //endregion
} as const;
export default covenants;
