window.QuizData = (function(){
var BANDS = {
  UTSD: { name: 'Uptown Showdown', genre: 'high-energy show band', style: 'Flagship show band, high-energy 80s/90s, disco, soul & R&B singalongs', video: 'https://youtu.be/Y0oHz4SKayU', photo: '../../assets/images/band-uptown-showdown.webp' },
  VS: { name: 'The Velvet Saints', genre: 'indie-rock band', style: 'Smaller line-up, high-energy indie/rock edge', video: 'https://youtu.be/2psnhMdF_X0', photo: '../../assets/images/band-velvet-saints.webp' },
  RS: { name: 'The Rock & Strollers', genre: 'roaming acoustic band', style: 'Roaming acoustic, chilled-to-building, guest-to-guest singalongs', video: 'https://youtu.be/Rrp-nPo6ULA', photo: '../../assets/images/band-rock-strollers.webp' },
  MH: { name: 'Miles High', genre: 'jazz & swing band', style: 'Jazz/swing, sophisticated ceremony, drinks & dinner music', video: 'https://youtu.be/BjbAbgVjQfQ', photo: '../../assets/images/band-miles-high.webp' },
  SOLO: { name: 'Soloist / Duo', genre: 'soloist or duo', style: 'Pared-back ceremony & drinks music, acoustic guitar, piano, sax, or a vocal duo', video: null, photo: null },
};
var EVENING_SONGS = [
  { title: 'Signed, Sealed, Delivered', artist: 'Stevie Wonder', tag: 'UTSD' },
  { title: 'September', artist: 'Earth, Wind & Fire', tag: 'UTSD' },
  { title: 'No Scrubs', artist: 'TLC', tag: 'UTSD' },
  { title: 'Where Is My Husband', artist: 'Raye', tag: 'UTSD' },
  { title: 'Waiting All Night', artist: 'Rudimental', tag: 'UTSD' },
  { title: '500 Miles', artist: 'The Proclaimers', tag: 'VS' },
  { title: 'Wonderwall', artist: 'Oasis', tag: 'VS' },
  { title: 'Since U Been Gone', artist: 'Kelly Clarkson', tag: 'VS' },
  { title: 'Teenage Dirtbag', artist: 'Wheatus', tag: 'VS' },
  { title: 'Mr Brightside', artist: 'The Killers', tag: 'overlap' },
  { title: 'Shut Up and Dance', artist: 'Walk the Moon', tag: 'overlap' },
  { title: "Don't Stop Believin'", artist: 'Journey', tag: 'overlap' },
];
// Daytime list is shared by the daytime-only path and the daytime half of the all-day path.
// Soloist/Duo (SOLO) is only ever a valid winner on the all-day path — see scorePath's allowSolo flag —
// since per the build spec it's never a standalone booking.
var DAYTIME_SONGS = [
  { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', tag: 'MH' },
  { title: 'L-O-V-E', artist: 'Nat King Cole', tag: 'MH' },
  { title: 'My Baby Just Cares for Me', artist: 'Nina Simone', tag: 'MH' },
  { title: 'Go Your Own Way', artist: 'Fleetwood Mac', tag: 'RS' },
  { title: '7 Days', artist: 'Craig David', tag: 'RS' },
  { title: 'Shut Up and Dance', artist: 'Walk the Moon', tag: 'RS' },
  { title: 'Little Lion Man', artist: 'Mumford & Sons', tag: 'RS' },
  { title: 'A Thousand Years', artist: 'Christina Perri', tag: 'SOLO' },
  { title: "If I Ain't Got You", artist: 'Alicia Keys', tag: 'SOLO' },
  { title: "Don't Know Why", artist: 'Norah Jones', tag: 'overlap' },
  { title: 'Lovely Day', artist: 'Bill Withers', tag: 'overlap' },
  { title: 'Brown Eyed Girl', artist: 'Van Morrison', tag: 'overlap' },
];
function scorePath(picks, songs, atmosphereBand, allowSolo){
  var tally = {};
  var single = songs.filter(function(s){ return picks.has(s.title) && s.tag !== 'overlap'; });
  single.forEach(function(s){ tally[s.tag] = (tally[s.tag] || 0) + 1; });
  if (!allowSolo) delete tally.SOLO;
  var entries = Object.entries(tally).sort(function(a,b){ return b[1]-a[1]; });
  var winner = entries[0] ? entries[0][0] : atmosphereBand;
  var isTie = entries.length > 1 && entries[0][1] === entries[1][1];
  if (isTie || !entries.length) winner = atmosphereBand;
  var total = single.length || 1;
  var winnerCount = tally[winner] || 1;
  var ratio = winnerCount / total;
  var pct = Math.round(80 + ratio * 17);
  if (atmosphereBand === winner) pct = Math.min(97, pct + 4);
  pct = Math.max(80, Math.min(97, pct));
  var namedPicks = Array.from(picks).slice(0, 3);
  return { winner: winner, pct: pct, namedPicks: namedPicks };
}
return { BANDS: BANDS, EVENING_SONGS: EVENING_SONGS, DAYTIME_SONGS: DAYTIME_SONGS, scorePath: scorePath };
})();
