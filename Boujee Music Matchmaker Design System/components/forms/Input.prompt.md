A labelled input field for the quiz's free-text and lead-capture steps (partner name, venue, name/email/phone).

```jsx
<Input label="Partner's name" placeholder="e.g. Alex" value={name} onChange={e => setName(e.target.value)} />
<Input label="Email" type="email" error={emailError} />
```

Uppercase metadata label above the field; focus ring in the brand's functional violet, never silver. Error state switches the border and helper text to the semantic error colour.
