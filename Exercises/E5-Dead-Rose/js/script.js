("use strict"); // URLs to JSON data
// const GREAT_OLD_ONES_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/mythology/lovecraft.json`;
// const ARCHSETTINGS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/setting.json`;
// const ARCHCHARACTER_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/character.json`;
// const ARCHARTEFACT_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/artifact.json`;
// const VERBS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/words/verbs.json`;
// const CORRIDORS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/architecture/rooms.json`;
// const CEPHALOPOD_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/animals/cephalopod_anatomy.json`;
// const PLANTS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/plants/plants.json`;
let greatOldOnes = [
  "Abhoth",
  "Ahtu",
  "Atlach-Nacha",
  "Azathoth",
  "Bastet",
  "Bokrug",
  "Chaugnar Faugn",
  "Cthugha",
  "Cthulhu",
  "Cthylla",
  "Cxaxukluth",
  "Cyäegha",
  "Dagon",
  "Daoloth",
  "Eihort",
  "Ghatanothoa",
  "Ghisguth",
  "Gla'aki",
  "Great Old One",
  "Hastur",
  "Hydra",
  "Hypnos",
  "Hziulquoigmnzhah",
  "Ithaqua",
  "The King in Yellow",
  "Knygathin Zhaum",
  "Nodens",
  "Nyarlathotep",
  "Nyogtha",
  "Other God",
  "Outer God",
  "Quachil Uttaus",
  "Sfatlicllp",
  "Shathak",
  "Shub-Niggurath",
  "Shudde M'ell",
  "Tsathoggua",
  "Tulzscha",
  "Ubbo-Sathla",
  "Vulthoom",
  "Ycnágnnisssz",
  "Y'golonac",
  "Yibb-Tstll",
  "Yig",
  "Yog-Sothoth",
  "Ythogtha",
  "Zoth-Ommog",
  "Zstylzhemghi",
  "Zvilpogghua",
];
let archSettingQualities = [
  "empty",
  "quiet",
  "lonesome",
  "social",
  "educational",
  "inspiring",
  "busy",
  "educational",
  "enlightening",
  "inspiring",
  "mundane",
  "routine",
  "productive",
  "busy",
  "dark",
  "hopeless",
  "trapped",
  "restful",
  "peaceful",
  "pleasant",
  "light",
  "recovery",
  "mundane",
  "productive",
  "spiritual",
  "welcoming",
  "peaceful",
  "enlightening",
  "inspiring",
  "hopeful",
  "healing",
  "lofty",
  "thoughtful",
  "watchful",
  "isolated",
  "connecting",
  "joining",
  "healing",
  "linking",
  "meeting",
  "open",
  "exposed",
  "spacious",
  "clear",
  "inspiring",
  "mundane",
  "moving",
  "productive",
  "progress",
  "transitional",
  "thoughtful",
  "progress",
  "mysterious",
  "dark",
  "dangerous",
  "wild",
  "uncontrollable",
  "tangled",
  "difficult",
  "deepness",
  "dark",
  "dangerous",
  "mysterious",
  "inside",
  "transitional",
  "changing",
  "impeding",
  "dangerous",
  "uncontrollable",
  "flowing",
  "moving",
  "spiritual",
  "cleansing",
  "purifying",
  "timeless",
  "eternal",
  "mysterious",
  "expansive",
  "unknowable",
  "immense",
  "safe",
  "orderly",
  "controlled",
  "happy",
  "nurturing",
  "growing",
  "arid",
  "empty",
  "hopeless",
  "isolated",
  "lonesome",
  "harsh",
  "dangerous",
  "changing",
  "isolated",
  "safe",
  "dangerous",
  "transitional",
  "challenging",
  "confusing",
  "challenging",
  "difficult",
  "ordered",
  "safe",
  "enlightening",
  "productive",
  "dark",
  "dangerous",
  "chaotic",
  "mysterious",
  "playful",
  "emerging",
  "awakening",
  "enlightening",
  "safe",
  "dark",
  "dangerous",
  "hiding",
  "strong",
  "safe",
  "protected",
];
let archCharacterQualities = [
  "brave",
  "willing",
  "determined",
  "unwilling",
  "reluctant",
  "rational",
  "logical",
  "obedient",
  "caring",
  "healing",
  "dynamic",
  "changeable",
  "mercurial",
  "unpredictable",
  "weak",
  "craven",
  "fearful",
  "opinionated",
  "cranky",
  "resolute",
  "educating",
  "guiding",
  "helpful",
  "mystical",
  "mysterious",
  "expositional",
  "revealing",
  "confusing",
  "egocentric",
  "misleading",
  "clever",
  "manipulative",
  "thoughtless",
  "silly",
  "amusing",
  "innocent",
  "naive",
  "simple",
  "straightforward",
  "credulous",
  "endearing",
  "reflecting",
  "quiet",
  "secretive",
  "curious",
  "curious",
  "dedicated",
  "driven",
  "fair",
  "unbiased",
  "patient",
  "thorough",
  "crafty",
  "final",
  "morbid",
  "dark",
  "sombre",
  "giving",
  "generous",
  "charitable",
  "patronizing",
  "incredible",
  "wishful",
  "ambitious",
  "talkative",
  "expositional",
  "unfettered",
  "egocentric",
  "strong",
  "protective",
  "egocentric",
  "short-sighted",
  "inspiring",
  "compelling",
  "self-sacrificing",
  "noble",
  "common",
  "typical",
  "average",
  "normal",
  "thoughtful",
  "lyrical",
  "myterious",
  "enlightening",
  "rebellious",
  "questioning",
  "trapped",
  "abused",
  "struggling",
  "angry",
  "selfless",
  "generous",
  "giving",
  "thoughtful",
  "curious",
  "dedicated",
  "determined",
  "lucky",
  "hurt",
  "predictable",
  "affirmative",
  "dependable",
  "alluring",
  "deceitful",
  "dominating",
  "demanding",
  "angry",
  "egocentric",
  "dedicated",
  "hurt",
  "abused",
  "injured",
  "fearful",
  "sickly",
  "poor",
  "neglected",
  "abandoned",
  "mindless",
  "devoted",
  "obedient",
];
let verbs = [
  "accepts",
  "adds",
  "admires",
  "admits",
  "advises",
  "affords",
  "agrees",
  "alerts",
  "allows",
  "amuses",
  "analyses",
  "announces",
  "annoys",
  "answers",
  "apologises",
  "appears",
  "applauds",
  "appreciates",
  "approves",
  "argues",
  "arranges",
  "arrests",
  "arrives",
  "asks",
  "attaches",
  "attacks",
  "attempts",
  "attends",
  "attracts",
  "avoids",
  "backs",
  "bakes",
  "balances",
  "bans",
  "bangs",
  "bares",
  "bats",
  "bathes",
  "battles",
  "beams",
  "begs",
  "behaves",
  "belongs",
  "bleaches",
  "blesses",
  "blinds",
  "blinks",
  "blots",
  "blushes",
  "boasts",
  "boils",
  "bolts",
  "bombs",
  "books",
  "bores",
  "borrows",
  "bounces",
  "bows",
  "boxes",
  "brakes",
  "branches",
  "breathes",
  "bruises",
  "brushes",
  "bubbles",
  "bumps",
  "burns",
  "buries",
  "buzzes",
  "calculates",
  "calls",
  "camps",
  "cares",
  "carries",
  "carves",
  "causes",
  "challenges",
  "changes",
  "charges",
  "chases",
  "cheats",
  "checks",
  "cheers",
  "chews",
  "chokes",
  "chops",
  "claims",
  "claps",
  "cleans",
  "clears",
  "clips",
  "closes",
  "coaches",
  "coils",
  "collects",
  "colours",
  "combs",
  "commands",
  "communicates",
  "compares",
  "competes",
  "complains",
  "completes",
  "concentrates",
  "concerns",
  "confesses",
  "confuses",
  "connects",
  "considers",
  "consists",
  "contains",
  "continues",
  "copies",
  "corrects",
  "coughs",
  "counts",
  "covers",
  "cracks",
  "crashes",
  "crawls",
  "crosses",
  "crushes",
  "cries",
  "cures",
  "curls",
  "curves",
  "cycles",
  "dams",
  "damages",
  "dances",
  "dares",
  "decays",
  "deceives",
  "decides",
  "decorates",
  "delays",
  "delights",
  "delivers",
  "depends",
  "describes",
  "deserts",
  "deserves",
  "destroys",
  "detects",
  "develops",
  "disagrees",
  "disappears",
  "disapproves",
  "disarms",
  "discovers",
  "dislikes",
  "divides",
  "doubles",
  "doubts",
  "drags",
  "drains",
  "dreams",
  "dresses",
  "drips",
  "drops",
  "drowns",
  "drums",
  "drys",
  "dusts",
  "earns",
  "educates",
  "embarrasses",
  "employs",
  "empties",
  "encourages",
  "ends",
  "enjoys",
  "enters",
  "entertains",
  "escapes",
  "examines",
  "excites",
  "excuses",
  "exercises",
  "exists",
  "expands",
  "expects",
  "explains",
  "explodes",
  "extends",
  "faces",
  "fades",
  "fails",
  "fancies",
  "fastens",
  "faxes",
  "fears",
  "fences",
  "fetches",
  "files",
  "fills",
  "films",
  "fires",
  "fits",
  "fixes",
  "flaps",
  "flashes",
  "floats",
  "floods",
  "flows",
  "flowers",
  "folds",
  "follows",
  "fools",
  "forces",
  "forms",
  "finds",
  "frames",
  "frightens",
  "fries",
  "gathers",
  "gazes",
  "glows",
  "glues",
  "grabs",
  "grates",
  "greases",
  "greets",
  "grins",
  "grips",
  "groans",
  "guarantees",
  "guards",
  "guesses",
  "guides",
  "hammers",
  "hands",
  "handles",
  "hangs",
  "happens",
  "harasses",
  "harms",
  "hates",
  "haunts",
  "heads",
  "heals",
  "heaps",
  "heats",
  "helps",
  "hooks",
  "hops",
  "hopes",
  "hovers",
  "hugs",
  "hums",
  "hunts",
  "hurries",
  "identifies",
  "ignores",
  "imagines",
  "impresses",
  "improves",
  "includes",
  "increases",
  "influences",
  "informs",
  "injects",
  "injures",
  "instructs",
  "intends",
  "interests",
  "interferes",
  "interrupts",
  "introduces",
  "invents",
  "invites",
  "irritates",
  "itches",
  "jails",
  "jams",
  "jogs",
  "joins",
  "jokes",
  "judges",
  "juggles",
  "jumps",
  "kicks",
  "kills",
  "kisses",
  "kneels",
  "knits",
  "knocks",
  "knots",
  "labels",
  "lands",
  "lasts",
  "laughs",
  "launches",
  "learns",
  "levels",
  "licenses",
  "licks",
  "lies",
  "lightens",
  "likes",
  "lists",
  "listens",
  "lives",
  "loads",
  "locks",
  "longs",
  "looks",
  "loves",
  "manages",
  "marches",
  "marks",
  "marries",
  "matches",
  "mates",
  "matters",
  "measures",
  "meddles",
  "melts",
  "memorises",
  "mends",
  "messes up",
  "milks",
  "mines",
  "misses",
  "mixes",
  "moans",
  "moors",
  "mourns",
  "moves",
  "muddles",
  "mugs",
  "multiplies",
  "murders",
  "nails",
  "names",
  "needs",
  "nests",
  "nods",
  "notes",
  "notices",
  "numbers",
  "obeys",
  "objects",
  "observes",
  "obtains",
  "occurs",
  "offends",
  "offers",
  "opens",
  "orders",
  "overflows",
  "owes",
  "owns",
  "packs",
  "paddles",
  "paints",
  "parks",
  "parts",
  "passes",
  "pastes",
  "pats",
  "pauses",
  "pecks",
  "pedals",
  "peels",
  "peeps",
  "performs",
  "permits",
  "phones",
  "picks",
  "pinches",
  "pines",
  "places",
  "plans",
  "plants",
  "plays",
  "pleases",
  "plugs",
  "points",
  "pokes",
  "polishes",
  "pops",
  "possesses",
  "posts",
  "pours",
  "practises",
  "prays",
  "preaches",
  "precedes",
  "prefers",
  "prepares",
  "presents",
  "preserves",
  "presses",
  "pretends",
  "prevents",
  "pricks",
  "prints",
  "produces",
  "programs",
  "promises",
  "protects",
  "provides",
  "pulls",
  "pumps",
  "punches",
  "punctures",
  "punishes",
  "pushes",
  "questions",
  "queues",
  "races",
  "radiates",
  "rains",
  "raises",
  "reaches",
  "realises",
  "receives",
  "recognises",
  "records",
  "reduces",
  "reflects",
  "refuses",
  "regrets",
  "reigns",
  "rejects",
  "rejoices",
  "relaxes",
  "releases",
  "relies",
  "remains",
  "remembers",
  "reminds",
  "removes",
  "repairs",
  "repeats",
  "replaces",
  "replies",
  "reports",
  "reproduces",
  "requests",
  "rescues",
  "retires",
  "returns",
  "rhymes",
  "rinses",
  "risks",
  "robs",
  "rocks",
  "rolls",
  "rots",
  "rubs",
  "ruins",
  "rules",
  "rushes",
  "sacks",
  "sails",
  "satisfies",
  "saves",
  "saws",
  "scares",
  "scatters",
  "scolds",
  "scorches",
  "scrapes",
  "scratches",
  "screams",
  "screws",
  "scribbles",
  "scrubs",
  "seals",
  "searches",
  "separates",
  "serves",
  "settles",
  "shades",
  "shares",
  "shaves",
  "shelters",
  "shivers",
  "shocks",
  "shops",
  "shrugs",
  "sighs",
  "signs",
  "signals",
  "sins",
  "sips",
  "skiis",
  "skips",
  "slaps",
  "slips",
  "slows",
  "smashes",
  "smells",
  "smiles",
  "smokes",
  "snatches",
  "sneezes",
  "sniffs",
  "snores",
  "snows",
  "soaks",
  "soothes",
  "sounds",
  "spares",
  "sparks",
  "sparkles",
  "spells",
  "spills",
  "spoils",
  "spots",
  "sprays",
  "sprouts",
  "squashes",
  "squeaks",
  "squeals",
  "squeezes",
  "stains",
  "stamps",
  "stares",
  "starts",
  "stays",
  "steers",
  "steps",
  "stirs",
  "stitches",
  "stops",
  "stores",
  "straps",
  "strengthens",
  "stretches",
  "strips",
  "strokes",
  "stuffs",
  "subtracts",
  "succeeds",
  "sucks",
  "suffers",
  "suggests",
  "suits",
  "supplies",
  "supports",
  "supposes",
  "surprises",
  "surrounds",
  "suspects",
  "suspends",
  "switches",
  "talks",
  "tames",
  "taps",
  "tastes",
  "teases",
  "telephones",
  "tempts",
  "terrifies",
  "tests",
  "thanks",
  "thaws",
  "ticks",
  "tickles",
  "ties",
  "times",
  "tips",
  "tires",
  "touches",
  "tours",
  "tows",
  "traces",
  "trades",
  "trains",
  "transports",
  "traps",
  "travels",
  "treats",
  "trembles",
  "tricks",
  "trips",
  "trots",
  "troubles",
  "trusts",
  "tries",
  "tugs",
  "tumbles",
  "turns",
  "twists",
  "types",
  "undresses",
  "unfastens",
  "unites",
  "unlocks",
  "unpacks",
  "untidies",
  "uses",
  "vanishes",
  "visits",
  "wails",
  "waits",
  "walks",
  "wanders",
  "wants",
  "warms",
  "warns",
  "washes",
  "wastes",
  "watches",
  "waters",
  "waves",
  "weighs",
  "welcomes",
  "whines",
  "whips",
  "whirls",
  "whispers",
  "whistles",
  "winks",
  "wipes",
  "wishes",
  "wobbles",
  "wonders",
  "works",
  "worries",
  "wraps",
  "wrecks",
  "wrestles",
  "wriggles",
  "x-rays",
  "yawns",
  "yells",
  "zips",
  "zooms",
];
let rooms = [
  "aerary",
  "aircraft cabin",
  "airport lounge",
  "alcove",
  "anatomical theatre",
  "anechoic chamber",
  "antechamber",
  "anteroom",
  "armory",
  "assembly room",
  "atelier",
  "attic",
  "auditorium",
  "backroom",
  "ballroom",
  "basement",
  "bathroom",
  "bedroom",
  "billiard room",
  "boardroom",
  "boiler room",
  "boudoir",
  "breakfast nook",
  "breezeway",
  "cabin",
  "cafeteria",
  "caldarium",
  "cellar",
  "changing room",
  "chapel",
  "classroom",
  "clean room",
  "cloakroom",
  "closet",
  "cold room",
  "common room",
  "computer lab",
  "conference room",
  "conservatory",
  "control room",
  "conversation pit",
  "corner office",
  "courtroom",
  "cry room",
  "darkroom",
  "den",
  "dining room",
  "dormitory",
  "drawing room",
  "dressing room",
  "electrical room",
  "emergency room",
  "engine room",
  "equipment room",
  "fallout shelter",
  "family room",
  "fitting room",
  "foyer",
  "game room",
  "garage",
  "guest room",
  "gym",
  "hotel room",
  "kitchen",
  "laundry room",
  "library",
  "living room",
  "lobby",
  "locker room",
  "loft",
  "lounge",
  "mailroom",
  "map room",
  "motel room",
  "mud room",
  "newsroom",
  "nursery",
  "office",
  "panic room",
  "pantry",
  "parlor",
  "playroom",
  "pool room",
  "print room",
  "rec room",
  "salon",
  "sauna",
  "schoolroom",
  "showroom",
  "sitting room",
  "staff room",
  "stockroom",
  "storm cellar",
  "studio",
  "study",
  "sunroom",
  "tearoom",
  "throne room",
  "transmission control room",
  "tv room",
  "utility room",
  "waiting room",
  "washroom",
  "water closet",
  "weight room",
  "wine cellar",
  "wiring closet",
  "workshop",
];
let archArtefactQualities = [
  "educational",
  "wise",
  "enlightening",
  "revealing",
  "illuminating",
  "opening",
  "clear",
  "truthful",
  "strong",
  "steady",
  "supporting",
  "damaging",
  "forceful",
  "growth",
  "renewal",
  "creation",
  "transitional",
  "protective",
  "mysterious",
  "warmth",
  "helpful",
  "moving",
  "transitional",
];
let archArtefactNames = [
  "map",
  "cloak",
  "seed",
  "blade",
  "staff",
  "bell",
  "candle",
  "book",
];
let plants = [
  "Zedoary",
  "Yellow coneflower",
  "Gray alder",
  "Apple of Sodom",
  "Black ash",
  "Red ash",
  "River ash",
  "Swamp ash",
  "Bay laurel",
  "River birch",
  "Hairy bittercress",
  "Blue-of-the-heavens",
  "Broadleaf",
  "Cherry",
  "Black cherry",
  "Cabinet cherry",
  "Rum cherry",
  "Chrysanthemum",
  "Lamb's cress",
  "Crow's nest",
  "Cucumber",
  "Devil's darning needle",
  "Bristly dewberry",
  "Swamp dewberry",
  "Dogwood",
  "Silky dogwood",
  "Eucalyptus",
  "Feverfew",
  "Fluxroot",
  "Wild garlic",
  "Rogue's gilliflower",
  "Grapevine",
  "Swamp hellebore",
  "Winterberry holly",
  "Itchweed",
  "Lamb's foot",
  "Lettuce",
  "Black maple",
  "Red river maple",
  "Sugar maple",
  "Mesquite",
  "Petty morel",
  "Garden nightshade",
  "Red oak",
  "Poplar",
  "Ragweed",
  "Rhubarb",
  "Shadblow serviceberry",
  "Snowdrop",
  "Sorrel",
  "Strawberry tree",
  "Wild tansy",
  "Milk thistle",
];
let cephalopodAnatomy = [
  "eyelid",
  "accessory nidamental gland",
  "cephalopod eye",
  "circumoral appendage bud",
  "accessory gland complex",
  "acetabulum",
  "main nidamental gland",
  "anal flap",
  "anterior salivary gland",
  "antitragus",
  "areolar spot",
  "arm",
  "arm IV",
  "armature of the arms",
  "basal shelf",
  "beak",
  "beak step",
  "branchial canal",
  "brachial crown",
  "brachial lobe of brain",
  "branchial gland",
  "branchial heart",
  "brachial photophore",
  "brachial pillar",
  "cephalopod brain",
  "buccal connective",
  "buccal crown",
  "buccal mass",
  "buccal membrane",
  "buccal sucker",
  "bursa copulatrix",
  "caecal sac",
  "caecum",
  "calamus",
  "cement body",
  "carpal sucker",
  "carpal knob",
  "carpus",
  "carpal locking apparatus",
  "cartilaginous tubercle",
  "cephalic cartilage",
  "cephalic vein",
  "chitin",
  "chromatophore",
  "circularis muscle",
  "cirrate male reproductive system",
  "arm cirrus",
  "cephalopod coelom",
  "collar",
  "photophore color filter",
  "conus",
  "conus field",
  "cornea",
  "crop",
  "ctenoglossan radula",
  "cupped coil",
  "cusp",
  "cuttlebone",
  "dactylus",
  "demibranch",
  "digestive gland",
  "digestive gland duct appendages (digda)",
  "distal oviduct",
  "doratopsis stage",
  "dorsal mantle cavity",
  "efferent vein",
  "efferent nerve",
  "egg mass",
  "ejaculatory apparatus",
  "end organ",
  "eye pore",
  "eyelid sinus",
  "fin attachment",
  "fin cartilage",
  "fin lobe",
  "fin",
  "foveola",
  "funnel",
  "funnel groove",
  "funnel-mantle locking-apparatus",
  "funnel organ",
  "funnel retractor muscle",
  "funnel valve",
  "gill",
  "gill lamella",
  "gladius",
  "half-orange gill",
  "head-mantle fusion",
  "hectocotylus",
  "heterodont radula",
  "homodont radula",
  "hook",
  "horizontal arm septum",
  "sucker ring",
  "inferior frontal lobe system",
  "infundibilum",
  "ink sac",
  "jet propulsion",
  "keel",
  "lateral membrane of arm IV",
  "lateral-line analogue",
  "photophore lens",
  "light guides",
  "ligula",
  "lip",
  "living chamber",
  "locking-apparatus of tentacular stalk",
  "mantle locking-apparatus",
  "mantle septum",
  "manus of tentacular club",
  "molluscan foot",
  "neck",
  "Needham's sac",
  "nephridial coelom",
  "nidamental gland",
  "nuchal cartilage",
  "nuchal crest",
  "nuchal membrane",
  "nuchal organ",
  "nuchal region",
  "occipital crest",
  "occipital fold",
  "occipital membrane",
  "cephalopod olfactory organ",
  "optic lobe of brain",
  "outer statocyst capsule",
  "oviducal gland",
  "cephalopod penis",
  "photophore",
  "photosensitive vesicle",
  "posterior buccal lobe",
  "posterior lip gland",
  "posterior salivary gland",
  "primary conus",
  "protective membrane",
  "proximal and distal fields",
  "pseudomorph",
  "photophore reflector",
  "cephalopod radula",
  "renal appendage",
  "rachis",
  "rostrum",
  "saddle",
  "saddle-shaped",
  "sagittate fin",
  "scales and tubercule",
  "secondary conus",
  "secondary eyelid",
  "secondary fin",
  "secondary web",
  "semicrescent plate",
  "sepioid gill",
  "shell sac",
  "side pocket",
  "siphuncle",
  "sperm mass",
  "spermatangia",
  "cephalopod spermathecum",
  "spermatophore",
  "stalk of tentacle",
  "stalked eye",
  "cephalopod statocyst",
  "stellate ganglion",
  "cephalopod stomach",
  "stylet",
  "sucker",
  "sucker series",
  "sucker stalk",
  "sucker teeth",
  "superior buccal lobes",
  "superocular cirri",
  "suprabrachial commissure",
  "cephalopod swimbladder",
  "tentacle",
  "tentacle absence",
  "tentacle pad",
  "tentacle pocket",
  "terminal fin",
  "terminal pad",
  "trabecula",
  "tragus",
  "truncate tooth",
  "cephalopod tubercule",
  "gladius vane",
  "ventral eyelid",
  "ventral shield",
  "vesicular tissue",
  "visceral nucleus",
  "visceral sac",
  "visceropericardial coelom",
  "water pore",
  "web",
  "web nodule",
  "white body",
  "wing",
  "ink",
  "primary oviduct",
  "cephalopod ovary",
  "photosensitive vesicle of cephalic cartilage",
  "photosensitive vesicle of stellate ganglion",
  "tentacular club",
  "optic nerve bundle",
  "lobe of nervous system",
  "buccal lobe",
  "subesophageal mass of brain",
  "middle subesophageal mass of brain",
  "posterior subesophageal mass of brain",
  "supraesophageal mass of brain",
  "basal lobe of brain",
  "superior frontal lobe system",
  "vertical frontal lobe system",
  "anal photophore",
  "collection of suckers",
  "transverse row of suckers",
  "circumoral appendage segment",
  "buccal membrane support",
  "extrategumental chromatophore",
  "chromatophore field",
  "tegumental chromatophore",
  "cirrus",
  "body cirrus",
  "phragmacone",
  "corneal membrane",
  "Koelicker organ",
  "lanceola",
  "macula",
  "nuchal fold",
  "ocellus",
  "cephalopod sperm receptacle",
  "spermatophore pad",
  "inner sucker ring",
  "outer sucker ring",
  "tail",
  "branchial heart appendage",
  "spot",
  "dorsal beak",
  "ventral beak",
  "septum",
  "arm I",
  "arm II",
  "arm III",
  "external shell",
  "spermatophore groove",
  "shield",
  "dorsal shield",
  "epirenal body",
  "renal sac",
  "tooth of sucker ring",
  "umbilicus",
  "lower rostral length",
  "upper rostral length",
  "spadix organ",
  "shell chamber",
  "shell septum",
  "orthocone",
  "internal shell",
  "shell aperture",
  "shell apex",
  "funnel component of funnel-mantle locking apparatus",
  "mantle component of funnel-mantle locking apparatus",
  "spermatophore gland",
  "Ammonoidea",
  "Goniatitida",
  "Ceratitida",
  "Ammonitida",
  "organ of Hoeven",
  "pyroform sac",
  "sexual size dimorphism",
  "buccal ganglion",
  "epithelial layer of gladius",
  "marginal epithelial layer of the gladius",
  "ventral epithelial layer of gladius",
  "iridophore",
  "leucophore",
];
let god, adj1, verb1, room, object;
// function preload() {
//   greatOldOnesData = loadJSON(GREAT_OLD_ONES_DATA_URL);
//   archSettingsData = loadJSON(ARCHSETTINGS_DATA_URL);
//   archCharacterData = loadJSON(ARCHCHARACTER_DATA_URL);
//   archArtefactData = loadJSON(ARCHARTEFACT_DATA_URL);
//   verbsData = loadJSON(VERBS_DATA_URL);
//   corridorsData = loadJSON(CORRIDORS_DATA_URL);
//   cephalopodData = loadJSON(CEPHALOPOD_DATA_URL);
//   plantsData = loadJSON(PLANTS_DATA_URL);
// }

function setup() {
  //select squid madlib fills
  squidGod = random(greatOldOnes);
  squidAdj = random(archSettingQualities);
  squidVerb = random(verbs);
  squidRoom = random(rooms);
  squidObject = random(cephalopodAnatomy);
  //select tomb madlib fills
  tombGod = random(greatOldOnes);
  tombAdj = random(archCharacterQualities);
  tombVerb = random(verbs);
  tombRoom = random(rooms);
  tombObject = random(archArtefactNames);
  //select stain glass madlib fills
  glassGod = random(greatOldOnes);
  glassAdj = random(archArtefactQualities);
  glassVerb = random(verbs);
  glassRoom = random(rooms);
  glassObject = random(plants);

  squidPoem = `O ${squidGod} thou art ${squidAdj}.
The invisible worm,
That ${squidVerb} in the night
In the howling storm:

Has found out thy ${squidRoom}
Of crimson joy:
And his dark secret ${squidObject}
Does thy life destroy.`;

  console.log(squidPoem);

  tombPoem = `O ${tombGod} thou art ${tombAdj}.
The invisible worm,
That ${tombVerb} in the night
In the howling storm:

Has found out thy ${tombRoom}
Of crimson joy:
And his dark secret ${tombObject}
Does thy life destroy.`;

  console.log(tombPoem);

  glassPoem = `O ${glassGod} thou art ${glassAdj}.
The invisible worm,
That ${glassVerb} in the night
In the howling storm:

Has found out thy ${glassRoom}
Of crimson joy:
And his dark secret ${glassObject}
Does thy life destroy.`;

  console.log(glassPoem);

  let squidImg = document.getElementById(`squidImg`);
  console.log(squidImg);

  let tombImg = document.getElementById(`tombImg`);
  console.log(tombImg);

  let glassImg = document.getElementById(`glassImg`);
  console.log(glassImg); //fill in squid madlibs
  /*
  god: greatOldOnesData.
  adj1: archSettingsData.
  verb1: verbsData.
  corridor: corridorsData.
  object: cephalopodData.
  */
  //fill in tomb madlibs

  /*
  god: greatOldOnesData.
  adj1: archSettingsData.
  verb1: verbsData.
  corridor: corridorsData.
  object: cephalopodData.
  */
  //fill in glass madlibs
  /*
  god: greatOldOnesData.
  adj1: archSettingsData.
  verb1: verbsData.
  corridor: corridorsData.
  object: cephalopodData.
  */
}
squidImg.addEventListener(`click`, function (event) {
  console.log("your image has been clicked");
  event.target.innerText = squidPoem;
  tombImg.innerText = "";
  glassImg.innerText = "";
  //if poulpe is clicked, madlibs get filled here  // load in new poem with appropriate madlibs
  // erase all images and display new poem
});
tombImg.addEventListener(`click`, function (event) {
  console.log("your image has been clicked");
  event.target.innerText = tombPoem;
  squidImg.innerText = "";
  glassImg.innerText = "";
  //if tomb is clicked, madlibs get filled here
  // load in new poem with appropriate madlibs
  // erase all images and display new poem
});
glassImg.addEventListener(`click`, function (event) {
  console.log("your image has been clicked");
  event.target.innerText = glassPoem;
  squidImg.innerText = "";
  tombImg.innerText = "";
  //if glass is clicked, madlibs get filled here
  // load in new poem with appropriate madlibs
  // erase all images and display new poem
}); //
