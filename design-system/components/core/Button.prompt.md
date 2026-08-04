The primary call-to-action control, used for "Find My Match", "Book your call", and quiz navigation.

```jsx
<Button variant="primary" size="lg" onClick={handleNext}>Find My Match</Button>
<Button variant="secondary">Back</Button>
<Button variant="ghost">Actually, show me what live band could suit us</Button>
```

Variants: `primary` (violet fill), `secondary` (outlined), `ghost` (underlined text, for soft-exit doors and low-emphasis links), `onInk` (coral fill, for CTAs sitting on a violet ground — never use `primary` on violet, it disappears). Sizes: `sm`, `md`, `lg`. Pressed state settles with a slight scale, not just a colour swap.
