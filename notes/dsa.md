# 🧮 DSA Problem Tracker

> **Note:** The authoritative problem list is now in [`notes/dsa.json`](./dsa.json) (150 NeetCode problems). This markdown file is kept for reference only.

## Pattern Progression
| Weeks | Pattern | Target |
|-------|---------|--------|
| 1–2 | Arrays, Strings, Hash Maps | 10–12 |
| 3–4 | Two Pointers, Sliding Window | 10–12 |
| 5–6 | Trees, Recursion, BFS/DFS | 10–12 |
| 7–8 | Binary Search, Heap | 8–10 |
| 9–10 | Linked Lists, Stack, Queue | 8–10 |
| 11–12 | Backtracking, Greedy | 8–10 |
| 13–16 | Dynamic Programming | 15–20 |
| 17–20 | Graphs, Tries, Advanced DP | 15–20 |
| 21–24 | Hard + Mock Interviews | 15–20 |

🎯 **Total Target: ~150 problems by Week 24**

---

## Problem Log

### Week 1 — Arrays, Strings, Hash Maps

| # | Problem | LeetCode | NeetCode | Pattern | Difficulty | Date | Time | Space | Notes |
|---|---------|----------|----------|---------|-----------|------|------|-------|-------|
| 1 | Contains Duplicate | [LC #217](https://leetcode.com/problems/contains-duplicate/) | [NC](https://neetcode.io/problems/duplicate-integer) | Hash Set | Easy | — | O(n) | O(n) | Add to set, return true if already exists |
| 2 | Valid Anagram | [LC #242](https://leetcode.com/problems/valid-anagram/) | [NC](https://neetcode.io/problems/is-anagram) | Char Freq Map | Easy | — | O(n) | O(n) | Count char frequency, compare maps |
| 3 | Two Sum | [LC #1](https://leetcode.com/problems/two-sum/) | [NC](https://neetcode.io/problems/two-integer-sum) | Complement Map | Easy | — | O(n) | O(n) | Store complement→index, one-pass |
| 4 | Group Anagrams | [LC #49](https://leetcode.com/problems/group-anagrams/) | [NC](https://neetcode.io/problems/anagram-groups) | Hash Map | Medium | — | O(n·k) | O(n) | Sort each string as key, group by key |
| 5 | Top K Frequent Elements | [LC #347](https://leetcode.com/problems/top-k-frequent-elements/) | [NC](https://neetcode.io/problems/top-k-elements-in-list) | Bucket Sort | Medium | — | O(n) | O(n) | Bucket sort by frequency avoids O(n log n) heap |
| 6 | Product of Array Except Self | [LC #238](https://leetcode.com/problems/product-of-array-except-self/) | [NC](https://neetcode.io/problems/products-of-array-discluding-self) | Prefix/Suffix | Medium | — | O(n) | O(1) | Two-pass: prefix left, suffix right |
| 7 | Valid Sudoku | [LC #36](https://leetcode.com/problems/valid-sudoku/) | [NC](https://neetcode.io/problems/valid-sudoku) | Hash Set | Medium | — | O(1) | O(1) | Three sets: rows, cols, 3×3 boxes |
| 8 | Longest Consecutive Sequence | [LC #128](https://leetcode.com/problems/longest-consecutive-sequence/) | [NC](https://neetcode.io/problems/longest-consecutive-sequence) | Hash Set | Medium | — | O(n) | O(n) | Only start counting from sequence starts (n-1 not in set) |
| 9 | Best Time to Buy and Sell Stock | [LC #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | [NC](https://neetcode.io/problems/buy-and-sell-crypto) | Sliding Min | Easy | — | O(n) | O(1) | Track running min price, compute max profit |
| 10 | Encode and Decode Strings | [LC #271](https://leetcode.com/problems/encode-and-decode-strings/) | [NC](https://neetcode.io/problems/string-encode-and-decode) | String Encoding | Medium | — | O(n) | O(n) | Prefix each string with `len#` |

---

## Problem Note Template

### Problem: [Name]
- **Link:** https://leetcode.com/problems/...
- **Pattern:** 
- **Approach:** 
- **Time complexity:** 
- **Space complexity:** 
- **Key insight:** 
