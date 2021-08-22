//let mettaur, mettaur2, mettaur3 = new Mettaur();
//let pharaohMan = new PharaohMan();

const testRound = [new Mettaur()];

const roundMettaur = [new Mettaur(), new Mettaur(), new Mettaur()];
const roundFireBlade = [new CanDevil(), new Swordy()];
const roundDoublePickWithACandle = [new CanDevil(), new Mettaur(), new Mettaur()];
const roundBossPharaohMan = [new PharaohMan()];
const roundThreeSwordsmenOfTheNet = [new Swordy(), new Swordy(), new Swordy()];
const roundTwoPicksAndAKnife = [new Mettaur(), new Mettaur(), new Swordy()];

//Test set of rounds
const testSetOfRounds = [testRound];
const testBossRound = [roundBossPharaohMan];

//Set of rounds
const firstSetOfRounds = [testRound, roundFireBlade, roundBossPharaohMan];

const easySetOfRounds = [roundMettaur, roundDoublePickWithACandle, roundBossPharaohMan];
const standardSetOfRounds = [roundMettaur, roundFireBlade, roundDoublePickWithACandle, roundTwoPicksAndAKnife, roundBossPharaohMan];
const hardSetOfRounds = [];
const undernetSetOfRounds = [];