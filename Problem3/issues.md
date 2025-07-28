# WalletPage Issue Summary

## Issues Identified

### 1. `FormattedWalletBalance` type should extend `WalletBalance`

**=> Fix**:

- Inherit `WalletBalance` type for `FormattedWalletBalance` type and only define `formattedAmount` field.

---

### 2. `Props` type extend `BoxProps` without introducing any new field

**=> Fix**:

- Go ahead and use `BoxProps` instead

---

### 3. `getPriority` should not be defined in the fucntion component to avoid unnecessary re-creating

**=> Fix**:

- Move `getPriority()` out of the component (_to util/helper_)
- Rename `blockchain` to `currency` with `string` type to avoid confusion
- OR define an `enum` for currencies and use a `constant` for currencies' priority mapping

---

### 4. `sortedBalances`'s `useMemo` is missing `getPriority` dependency and having unnecessary `prices` dependency

**=> Fix**:

- Add `getPriority` to dependency array (_not needed if it is moved out of the component_)
- Remove `prices` from dependency array to avoid re-calculating

---

### 5. Re-calculating priorities in `sortedBalances`'s `useMemo`

**=> Fix**:

- Calculate priorities and store them in variables and use them for both filtering and sorting

---

### 6. `balancePriority` is unused and `lhsPriority` is not defined in `sortedBalances`'s `useMemo`

**=> Fix**:

- Replace `lhsPriority` with `balancePriority`

---

### 7. Inefficient and not always return number `sort()` in `sortedBalances`'s `useMemo`

**=> Fix**:

- Optimize `sort()` to return `leftPriority - rightPriority`

---

### 8. `blockchain` does not exist on type `WalletBalance`

**=> Fix**:

- Replace `blockchain` with `currency`.

---

### 9. `formattedBalances` is created but never used

**=> Fix**:

- Put format logic in `sortedBalances`'s `useMemo` and rename `sortedBalances` to `formattedBalances` as it is final value to be used.

---

### 10. `index` is used as `key` for `WalletRow` component

**=> Fix**:

- Utilize unique field like `currency` from `WalletBalance` as `key` instead.

---

### 11. No safe check for `prices[balance.currency]`

**=> Fix**:

- Default to `0` if `prices[balance.currency]` is `undefined`
- OR return `undefined` and update `WalletRow` to display "Not available" for `undefined` usdValue

---

### 12. `BoxProps` might not compatible to pass on `div` with `{...rest}`

**=> Fix**:

- Only passing `div`'s compatible props from `BoxProps`
- OR create a new props type containing all needed prop fields

---

### 13. `rows` is re-created unnecessarily on props/states change

**=> Fix**:

- Use `useMemo` for `rows` with required dependency array.
- Possible to combine with `formattedBalances`'s `useMemo` since `formattedBalances` is only used for `rows` to save memory if `prices` is not likely to change.

---
