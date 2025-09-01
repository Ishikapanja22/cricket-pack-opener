export function pickTierFromOdds(odds){
const entries = Object.entries(odds)
const total = entries.reduce((s,[,v]) => s+v, 0)
const r = Math.random()*total
let sum = 0
for(const [tier, weight] of entries){
sum += weight
if(r <= sum) return tier
}
return entries[entries.length-1][0]
}


export function openPack(packType, packSize, odds, players, guaranteeRare=true){
const drawn = []
for(let i=0;i<packSize;i++){
const tier = pickTierFromOdds(odds)
const candidates = players.filter(p => p.tier === tier)
const pick = candidates[Math.floor(Math.random()*candidates.length)]
drawn.push(pick)
}


if(guaranteeRare){
const hasRarePlus = drawn.some(d => ['Rare','Epic','Legend'].includes(d.tier))
if(!hasRarePlus){
const rarePool = players.filter(p => ['Rare','Epic','Legend'].includes(p.tier))
drawn[Math.floor(Math.random()*drawn.length)] = rarePool[Math.floor(Math.random()*rarePool.length)]
}
}
return drawn
}