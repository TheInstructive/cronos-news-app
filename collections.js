const collections = [
    {id: "970110042424610886", slug: "afe", name: "Aliens From Earth", image: require('./images/collections/afe.png'), tag: "nft"},
    {id: "910134816568127488", slug: "loaded-lions", name: "Loaded Lions", image: require('./images/collections/loadedlions.png'), tag: "nft, gamefi" },
    {id: "903875726418268220", slug: "ballies",name: "Ballies", image: require('./images/collections/ballies.png'), tag: "nft, gamefi" },
    {id: "993365676150509730", slug:"miner-mole", name: "VVS Miner Mole", image: require('./images/collections/vvsminermole.png'), tag: "nft, gamefi" },
    {id: "1009732055648714813", slug:"cronos-cruisers", name: "Cronos Cruisers", image: require('./images/collections/CronosCruisers.png'), tag: "nft, gamefi" },
    {id: "913035213670612992", slug:"croskull", name: "CroSkull", image: require('./images/collections/croskull.png'), tag: "nft, gamefi" },
    {id: "944556573005590579", slug:"argonauts", name: "Argonauts", image: require('./images/collections/argonauts.png'), tag: "nft, gamefi" },
    {id: "896483719295156274", slug:"cronos-chimp-club", name: "Cronos Chimp Club", image: require('./images/collections/cronoschimp.png'), tag: "nft" },
    {id: "961691083333595167", slug:"gangverse", name: "Gangverse Social Club", image: require('./images/collections/Gangverse.png'), tag: "nft" },
    {id: "1044839682057453639", slug:"eyeball", name: "Eyeball Games", image: require('./images/collections/Eyeball.png'), tag: "nft, gamefi" },
    {id: "912620482031939599", slug:"dgpals", name: "D.G.Pals", image: require('./images/collections/DGPALS.png'), tag: "nfti gamefi" },
    {id: "936221636829519874", slug:"marbleverse", name: "MarbleVerse", image: require('./images/collections/MarbleVerse.png'), tag: "nft, gamefi" },
    {id: "951937723323785216", slug:"cronosverse", name: "The CronosVerse", image: require('./images/collections/CronosVerse.png'), tag: "nft, gamefi"},
    {id: "944856594678693888", slug:"flaming-phenix", name: "Flaming Phenix Club", image: require('./images/collections/FlamingPhenixClub.png'), tag: "nft" },
    {id: "903133867924422677", slug:"cro-crow", name: "CRO Crow", image: require('./images/collections/CROCrow.png'), tag: "nft" },
    {id: "921711758484328458", slug:"trooprz", name: "Trooprz", image: require('./images/collections/Trooprz.png'), tag: "nft" },
    {id: "1016711439131623454", slug:"bored-candy", name: "Bored Candy", image: require('./images/collections/BoredCandy.png'), tag: "nft, gamefi" },
    {id: "969658754838720556", slug:"crogenft", name: "CrogeNFT", image: require('./images/collections/CrogeNFT.png'), tag: "nft, gamefi" },
    {id: "911705542995636255", slug:"weird-apes-club", name: "Weird Apes Club", image: require('./images/collections/WeirdApesClub.png'), tag: "nft" },
    {id: "1065027632531521556", slug:"cronos-factions", name: "Cronos Factions", image: require('./images/collections/factions.png'), tag: "nft" },
    {id: "1014397087116439654", slug:"undead-space-apes", name: "Undead Space Apes", image: require('./images/collections/UndeadSpaceApes.png'), tag: "nft" },
    {id: "1003267678552739860", slug:"blumies", name: "Blumies", image: require('./images/collections/blumies.png'), tag: "nft" },
    {id: "966011090330865704", slug:"baby-alien-division", name: "Baby Alien Division", image: require('./images/collections/BabyAlienDivision.png'), tag: "nft" },
    {id: "929744973283340298", slug:"cro-homes", name: "CRO Homes", image: require('./images/collections/CROHomes.png'), tag: "nft" },
    {id: "923642608788578396", slug:"crougar-kingdom", name: "CROugar Kingdom", image: require('./images/collections/CROugarKingdom.png'), tag: "nft" },
    {id: "998297452161552424", slug:"crohogs", name: "CroHogs", image: require('./images/collections/CroHogs.png'), tag: "nft"},
    {id: "1072076032624033812", slug:"primate-business", name: "Primate Business", image: require('./images/collections/PrimateBusiness.png'), tag: "nft" },
    {id: "911246161233457172", slug:"crxillion", name: "Crxillion", image: require('./images/collections/Crxillion.png'), tag: "nft" },
    {id: "967089657475121254", slug:"exodus", name: "VerAI - Exodus", image: require('./images/collections/Exodus.png'), tag: "nft" },
    {id: "1056245905994559595", slug:"cr00ts", name: "Cr00ts", image: require('./images/collections/Cr00ts.png'), tag: "nft" },
    {id: "971573260909162516", slug:"apes-utopia", name: "Apes Utopia", image: require('./images/collections/apesutopia.png'), tag: "nft" },
    {id: "961425677024919614", slug:"aiko-beanz", name: "AIKO BEANZ", image: require('./images/collections/aiko.png'), tag: "nft" },
    {id: "372888248743100426", slug:"cdc", name: "Crypto.com", image: require('./images/collections/CDC.png'), tag: "finance" },  
    {id: "940705475165577226", slug:"cronos", name: "Cronos", image: require('./images/collections/cronos.png'), tag: "other" },
    {id: "783271884451872780", slug:"crypto-org", name: "Crypto.org", image: require('./images/collections/Cryptoorg.png'), tag: "other" },
    {id: "919933332035342396", slug:"cdc-nft", name: "Crypto.com NFT", image: require('./images/collections/cdc-nft.png'), tag: "marketplace" },  
    {id: "994547822701592607", slug:"minted", name: "Minted", image: require('./images/collections/minted.png'), tag: "marketplace" },
    {id: "905933527936278609", slug:"ebisu", name: "Ebisu's Bay", image: require('./images/collections/ebisusbay.png'), tag: "marketplace" },
    {id: "981654148191772702", slug:"moonflow", name: "MoonfloW", image: require('./images/collections/MoonfloW.png'), tag: "marketplace" },
    {id: "905038556140036106", slug:"VVSFinance", name: "VVS Finance", image: require('./images/collections/vvs.png'), tag: "finance" },   
    {id: "1070306509122187264", slug:"fulcrom", name: "Fulcrom Finance", image: require('./images/collections/Fulcrom.png'), tag: "finance" },
    {id: "1003888475566772295", slug:"cronos-id", name: "Cronos ID", image: require('./images/collections/cronosid.png'), tag: "other" },
    {id: "1042850385670447114", slug:"veno", name: "Veno Finance", image: require('./images/collections/veno.png'), tag: "finance" },
    {id: "910930155218817054", slug:"tectonic", name: "Tectonic Finance", image: require('./images/collections/Tectonic.png'), tag: "finance"},
    {id: "994223754219638927", slug:"the-void", name: "The Void", image: require('./images/collections/thevoid.png'), tag: "other" },
  
  ];
  
  export default collections;
  
  export function bySlug(slug) {
    return collections.filter(col => col.slug === slug)[0];
  }
  
  export function byID(id){
    return collections.filter(col => col.id === id)[0];
  }