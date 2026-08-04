The signature keyboard-setlist row for the multi-select song questions (Q4 daytime, Q6 evening).

```jsx
<SongRow title="Mr Brightside" artist="The Killers" selected={picked.has('mr-brightside')} onClick={toggle} />
```

Behaves like a piano key: pressing depresses and shifts the row, a band of ink appears along the leading edge (the "felt"), and the heart fills on release. Stack full-width in a vertical list — never a tile grid (no album art, per licensing constraints).
