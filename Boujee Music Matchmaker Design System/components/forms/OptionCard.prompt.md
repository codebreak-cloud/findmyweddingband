A single-select question answer, used for standard quiz questions (Q1, Q2, Q3, Q5, Q7, Q8).

```jsx
<OptionCard label="Live music that gets everyone up and dancing" selected={answer === 'party'} onClick={() => setAnswer('party')} />
```

Selected state fills with the tint colour and switches the border to solid ink — never relies on silver, which lacks the contrast to signal state accessibly. Optional `sublabel` for supporting detail.
