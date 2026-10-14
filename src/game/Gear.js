// Gear and upgrade data. The upgrade shop (a vendor by the boathouse) is not built yet; everything
// the game reads goes through gearStats( state.upgrades ), so buying a level is just
// state.upgrades[ key ]++ and the stats follow.
//
// Each track: levels[ 0 ] is what you start with; cost is the price of that level (0 for the first).
export const UPGRADES = {
    line: { name: '鱼线', levels: [
        { cost: 0, label: '8 磅单丝', lineKg: 7 },
        { cost: 60, label: '15 磅单丝', lineKg: 13 },
        { cost: 180, label: '30 磅编织', lineKg: 26 },
        { cost: 450, label: '60 磅编织', lineKg: 50 },
    ] },
    reel: { name: '卷线器', levels: [
        { cost: 0, label: '旧纺车轮', reelSpeed: 1.1 },
        { cost: 90, label: '顺滑纺车轮', reelSpeed: 1.6 },
        { cost: 320, label: '传统轮', reelSpeed: 2.2 },
    ] },
    rod: { name: '鱼竿', levels: [
        { cost: 0, label: '旧鱼竿', castM: 22 },
        { cost: 75, label: '7 英尺石墨竿', castM: 32 },
        { cost: 260, label: '9 英尺冲浪竿', castM: 45 },
    ] },
    hold: { name: '鱼舱', levels: [
        { cost: 0, label: '冷藏箱', holdKg: 30 },
        { cost: 120, label: '冰柜', holdKg: 70 },
        { cost: 400, label: '隔热鱼舱', holdKg: 160 },
    ] },
    fuel: { name: '油箱', levels: [
        { cost: 0, label: '40 升油箱', fuelL: 40 },
        { cost: 150, label: '80 升油箱', fuelL: 80 },
        { cost: 380, label: '150 升油箱', fuelL: 150 },
    ] },
    engine: { name: '引擎', levels: [
        { cost: 0, label: '老旧柴油机', speedMul: 1 },
        { cost: 300, label: '翻新柴油机', speedMul: 1.15 },
        { cost: 700, label: '涡轮柴油机', speedMul: 1.3 },
    ] },
    fishFinder: { name: '探鱼器', levels: [
        { cost: 0, label: '无', finder: false },
        { cost: 250, label: '探鱼器（HUD 显示深度和鱼）', finder: true },
    ] },
    lights: { name: '船只灯光', levels: [
        { cost: 0, label: '仅导航灯', deckLights: false },
        { cost: 140, label: '甲板泛光灯（夜间钓鱼）', deckLights: true },
    ] },
};

export const FUEL_PRICE = 1.5; // $ per litre of diesel at the chandlery
// litres per second at the helm: idle plus a lot more at full rpm (40 L lasts ~25 min flat out)
export function fuelBurn( rpm ) {

	return 0.0025 + 0.024 * rpm * rpm;

}

// next level of a track, or null when maxed
export function nextLevel( upgrades, key ) {

	const lv = UPGRADES[ key ].levels;
	const i = ( upgrades[ key ] | 0 ) + 1;
	return i < lv.length ? { index: i, ...lv[ i ] } : null;

}

export function defaultUpgrades() {

	const u = {};
	for ( const k in UPGRADES ) u[ k ] = 0;
	return u;

}

// merged stats of the current levels
export function gearStats( upgrades ) {

	const s = {};
	for ( const k in UPGRADES ) {

		const lv = UPGRADES[ k ].levels;
		const i = Math.max( 0, Math.min( lv.length - 1, upgrades[ k ] | 0 ) );
		for ( const [ key, v ] of Object.entries( lv[ i ] ) ) if ( key !== 'cost' && key !== 'label' ) s[ key ] = v;

	}

	return s;

}
