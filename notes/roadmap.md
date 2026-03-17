# 🗺️ World-Class Developer Roadmap — @jayanta411
**Started:** 2026-03-17  
**Goal:** World-class React + Full-Stack engineer, AI/ML & Data Engineering proficiency, top-tier job ready.

---

## 📌 How to Use This File

- Every task is a checkbox `- [ ]`.
- Check off tasks as you complete them: `- [x]`.
- At end of each week → run the **Weekly Retrospective**.
- Any `- [ ]` task not done → paste it into next week under `## 🔁 Rolled Over`.
- To add a new topic → add it to the relevant week or to `## 🗂️ Backlog`.
- To remove/pause a topic → move it to `## ⏸️ Paused`.

---

## 🔌 MCP Server Integration Plan

MCP servers extend this Copilot Space with live tool access.  
Integrate in this order:

| Priority | MCP Tool | Purpose | When to Add |
|----------|----------|---------|-------------|
| 1 | **GitHub MCP** | Read open issues/tasks from this repo, track progress | Week 1 |
| 2 | **Browser/Search MCP** | Fetch docs (React, MDN, PyTorch, PostgreSQL) inside Space | Week 2 |
| 3 | **Database MCP** | Run SQL queries directly inside Space | Phase 2 (Week 5+) |
| 4 | **Python REPL MCP** | Run ML/data code inline in Space | Phase 3 (Week 9+) |
| 5 | **LeetCode/DSA MCP** | Fetch next problem by pattern, track streak | Week 2+ |

> ✅ Start with GitHub MCP — create issues for each week's goals, label them `this-week`.
> Then tell Copilot: "Check my open GitHub issues and give me today's tasks."

---

## 📊 DSA Pattern Progression (All Phases)

| Weeks | Pattern | Target Problems |
|-------|---------|----------------|
| 1–2 | Arrays, Strings, Hash Maps | 10–12 |
| 3–4 | Two Pointers, Sliding Window | 10–12 |
| 5–6 | Trees, Recursion, BFS/DFS | 10–12 |
| 7–8 | Binary Search, Heap/Priority Queue | 8–10 |
| 9–10 | Linked Lists, Stack, Queue | 8–10 |
| 11–12 | Backtracking, Greedy | 8–10 |
| 13–16 | Dynamic Programming (DP) | 15–20 |
| 17–20 | Graphs, Tries, Advanced DP | 15–20 |
| 21–24 | Hard problems, mock interviews | 15–20 |

🎯 **Total target: ~150 problems by Week 24** (mostly easy→medium, some hard)

---

## 🗂️ Phase Overview

| Phase | Weeks | Theme |
|-------|-------|-------|
| Phase 1 | 1–4 | Core sharpening: React, JS, Python, SQL, DSA habit |
| Phase 2 | 5–8 | Full-stack app + system design + scikit-learn ML |
| Phase 3 | 9–16 | AI/ML deep dive + LLMs + applied projects |
| Phase 4 | 17–24 | Data engineering + production systems + interview prep |

### 🔄 Parallel Tracks (Every Week, All Phases)
- DSA: 5–7 problems/week
- System design: 1 topic/week
- Portfolio: update README, push code, note key decisions
- Personal brand: every 2 weeks, write a short TIL note; monthly publish a blog/gist

---

---

# PHASE 1 — Core Sharpening (Weeks 1–4)

---

## ✅ Week 1 (2026-03-17 → 2026-03-22)
**Theme:** Set up structure, Advanced JS, React performance basics, Python+Pandas intro, SQL basics, start DSA.

### 🔁 Rolled Over from Previous Week
_Nothing yet — this is Week 1._

### 📦 Repo Setup
- [ ] Create repo: `world-class-dev-journey`
- [ ] Create folder structure:
  - `frontend/react-playground/`
  - `backend/`
  - `ml/`
  - `data-eng/`
  - `notes/`
- [ ] Create this file: `notes/roadmap.md`
- [ ] Create `notes/weekly_log.md`
- [ ] Create `notes/dsa.md`
- [ ] Create `notes/system_design.md`
- [ ] Create `notes/sql.md`
- [ ] (Optional) Set up GitHub MCP — link repo to this Copilot Space

### ⚛️ React / Frontend
- [ ] Review React reconciliation + Fiber architecture (read, take notes)
- [ ] Build `frontend/react-playground/` app:
  - [ ] List component with expensive render simulation
  - [ ] Button to add items
  - [ ] Optimize with `React.memo`, `useCallback`, `useMemo`
- [ ] Add code-split heavy component using dynamic `import()`
- [ ] Write 2 tests (React Testing Library + Vitest/Jest):
  - [ ] Component renders correctly
  - [ ] Button click updates state

### 🟨 Advanced JavaScript
- [ ] Study & note: event loop, call stack, microtasks vs macrotasks
- [ ] Study & note: closures, lexical scope, `this`, prototypal inheritance
- [ ] Implement:
  - [ ] A closure-based private counter
  - [ ] A basic `myBind` or `myCall` implementation

### 🖥️ Full-Stack / Backend
- [ ] Choose stack: Node + Express **or** Python + FastAPI
- [ ] Create `backend/` skeleton:
  - [ ] `/health` endpoint → `{ status: "ok" }`
  - [ ] `/users` GET → return in-memory list
  - [ ] `/users` POST → add user to in-memory list

### 🤖 AI / ML
- [ ] Create `ml/python_basics.py` or `.ipynb`:
  - [ ] Demonstrate list/dict comprehensions, generators, `*args`/`**kwargs`
  - [ ] Implement a `Dataset` class:
    - [ ] Accepts CSV path
    - [ ] Has `head(n)`, `describe()`, `to_numpy()`
    - [ ] 2–3 unit tests
- [ ] Create `ml/pandas_intro.ipynb`:
  - [ ] Load any CSV dataset
  - [ ] `head()`, `info()`, `describe()`
  - [ ] Filter rows, group by + aggregate
  - [ ] Handle missing values (`fillna`, `dropna`)

### 🗄️ Data Engineering / SQL
- [ ] Create mock schema in `notes/sql.md`:
  - `users(id, name, created_at)`
  - `orders(id, user_id, amount, created_at)`
- [ ] Write queries:
  - [ ] Total orders per user
  - [ ] Top 5 users by total amount
  - [ ] Orders in the last 30 days

### 🧮 DSA
- [ ] Solve 4–5 LeetCode easy problems (arrays/strings/hash maps)
- [ ] Document each in `notes/dsa.md`:
  - Problem link, approach, time/space complexity

### 🏗️ System Design
- [ ] Create `notes/system_design.md`
- [ ] Sketch a **URL Shortener**:
  - [ ] Components (API, DB, cache)
  - [ ] DB schema
  - [ ] Basic scaling ideas

### 📓 Weekly Retrospective
- [ ] Update `notes/weekly_log.md`:
  - What I completed
  - What I'm rolling over
  - One focus adjustment for Week 2
- [ ] Move all `- [ ]` tasks above → paste into Week 2 `## 🔁 Rolled Over`

---

## 📅 Week 2 (2026-03-23 → 2026-03-29)
**Theme:** Next.js basics, Postgres integration, React forms, Pandas advanced, first ML model, SQL joins + window functions.

### 🔁 Rolled Over from Week 1
_Paste unfinished Week 1 tasks here at end of Week 1._

### ⚛️ React / Frontend
- [ ] Set up a **Next.js app** (App Router) in `frontend/nextjs-app/`
- [ ] Create 3 pages: Home, About, Dashboard (with basic layout)
- [ ] Add a dynamic route: `/users/[id]`
- [ ] Build a form with client-side validation:
  - [ ] Required fields
  - [ ] Email format check
  - [ ] Error states shown inline

### 🖥️ Full-Stack / Backend
- [ ] Set up PostgreSQL (Docker or local)
- [ ] Connect backend to Postgres:
  - [ ] Create `users` table
  - [ ] Replace in-memory users with DB queries
- [ ] Add proper error handling middleware to backend
- [ ] Add basic request logging (morgan or custom middleware)

### 🤖 AI / ML
- [ ] Pandas advanced in `ml/pandas_advanced.ipynb`:
  - [ ] `merge`, `concat`, `pivot_table`
  - [ ] Custom aggregation with `agg()`
  - [ ] Time-series basics: resample, rolling
- [ ] First scikit-learn model in `ml/first_model.ipynb`:
  - [ ] Load a dataset (e.g. California Housing or Titanic)
  - [ ] Train a `LinearRegression` or `LogisticRegression`
  - [ ] Evaluate: accuracy/MSE, train vs test split

### 🗄️ Data Engineering / SQL
- [ ] Practice 8–10 SQL queries in `notes/sql.md`:
  - [ ] INNER JOIN, LEFT JOIN
  - [ ] Subqueries
  - [ ] CTE (WITH clause)
  - [ ] `ROW_NUMBER()`, `RANK()` window functions

### 🧮 DSA (Pattern: Arrays, Hash Maps → start Two Pointers)
- [ ] Solve 5–7 problems
- [ ] Focus patterns: Hash Maps, Two Pointers intro
- [ ] Suggested problems:
  - [ ] Two Sum
  - [ ] Valid Anagram
  - [ ] Contains Duplicate
  - [ ] Longest Substring Without Repeating Characters

### 🏗️ System Design
- [ ] Sketch a **Social Feed System** (Twitter-lite) in `notes/system_design.md`:
  - [ ] Feed generation (fan-out on write vs read)
  - [ ] DB schema
  - [ ] Caching strategy

### 🌟 Portfolio / Personal Brand
- [ ] Add a `README.md` to your GitHub profile
- [ ] Write first `notes/til.md` entry (something you learned this week)

### 📓 Weekly Retrospective
- [ ] Update `notes/weekly_log.md`
- [ ] Move unfinished tasks → Week 3 `## 🔁 Rolled Over`

---

## 📅 Week 3 (2026-03-30 → 2026-04-05)
**Theme:** Auth, state management (Zustand/Redux Toolkit), REST API best practices, ML evaluation deep dive, SQL aggregation mastery.

### 🔁 Rolled Over from Week 2
_Paste unfinished Week 2 tasks here._

### ⚛️ React / Frontend
- [ ] Add **Zustand** or **Redux Toolkit** to Next.js app for global state
- [ ] Implement auth flow (UI only):
  - [ ] Login form → token stored in state
  - [ ] Protected route: redirect if not logged in
- [ ] Add **React Query** (or SWR) for data fetching from backend
- [ ] Write 3–5 more component tests

### 🖥️ Full-Stack / Backend
- [ ] Implement **JWT authentication**:
  - [ ] POST `/auth/login` → returns JWT
  - [ ] Middleware to protect routes
- [ ] Add `orders` table + CRUD endpoints
- [ ] Connect frontend auth to backend JWT
- [ ] Handle CORS properly

### 🤖 AI / ML
- [ ] ML evaluation deep dive in `ml/evaluation.ipynb`:
  - [ ] Confusion matrix, precision, recall, F1, ROC-AUC
  - [ ] Overfitting vs underfitting (learning curves)
  - [ ] Cross-validation
- [ ] Try a second model: **Decision Tree** or **Random Forest** on same dataset
- [ ] Compare models: which performs better and why?

### 🗄️ Data Engineering / SQL
- [ ] Advanced window functions:
  - [ ] `LAG()`, `LEAD()`
  - [ ] Running totals with `SUM() OVER()`
  - [ ] `NTILE()` for percentile buckets
- [ ] Write a simple **ETL script** in `data-eng/etl_basic.py`:
  - [ ] Extract: read CSV
  - [ ] Transform: clean nulls, rename columns, type cast
  - [ ] Load: insert into Postgres table

### 🧮 DSA (Pattern: Two Pointers, Sliding Window)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] 3Sum
  - [ ] Remove Duplicates from Sorted Array
  - [ ] Maximum Sum Subarray of Size K
  - [ ] Minimum Window Substring

### 🏗️ System Design
- [ ] Sketch a **Rate Limiter** design:
  - [ ] Token bucket vs sliding window
  - [ ] Where it sits in architecture
  - [ ] Redis usage

### 🌟 Portfolio / Personal Brand
- [ ] Push all Week 1–3 code to GitHub with meaningful commit messages
- [ ] Write TIL entry #2

### 📓 Weekly Retrospective
- [ ] Update `notes/weekly_log.md`
- [ ] Move unfinished tasks → Week 4 `## 🔁 Rolled Over`

---

## 📅 Week 4 (2026-04-06 → 2026-04-12)
**Theme:** Phase 1 consolidation. Polish full-stack app v1. Deeper React patterns. Intro to deep learning. Data modeling basics.

### 🔁 Rolled Over from Week 3
_Paste unfinished Week 3 tasks here._

### ⚛️ React / Frontend
- [ ] Implement **code splitting + lazy loading** across Next.js app
- [ ] Add **accessibility (a11y)** audit to at least 2 components:
  - [ ] ARIA labels, keyboard navigation, focus management
- [ ] Profile app with **React DevTools** Profiler:
  - [ ] Identify and fix 1–2 unnecessary re-renders
- [ ] Write an integration test (Cypress or Playwright):
  - [ ] Login flow end-to-end

### 🖥️ Full-Stack / Backend
- [ ] Add **pagination** to `/users` and `/orders` endpoints
- [ ] Add **filtering and sorting** query params
- [ ] Document API with **Swagger/OpenAPI** (or Postman collection)
- [ ] Add basic health monitoring endpoint with uptime + DB status

### 🤖 AI / ML
- [ ] Intro to **deep learning** in `ml/deep_learning_intro.ipynb`:
  - [ ] What is a neural network (perceptron → layers)
  - [ ] Implement a simple 2-layer net with **PyTorch** or **Keras**:
    - [ ] On MNIST or a binary classification dataset
  - [ ] Train + evaluate (loss curve, accuracy)
- [ ] Learn: activation functions, backpropagation concept (high level)

### 🗄️ Data Engineering
- [ ] Data modeling basics in `data-eng/data_modeling.md`:
  - [ ] Normalized vs denormalized
  - [ ] Star schema: fact + dimension tables
  - [ ] Design a simple star schema for an e-commerce scenario
- [ ] Set up **Apache Airflow** locally (Docker) or use **Prefect Cloud** (free tier):
  - [ ] Create your first DAG/flow: runs the ETL script from Week 3

### 🧮 DSA (Pattern: Sliding Window + start Trees)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] Longest Repeating Character Replacement
  - [ ] Permutation in String
  - [ ] Invert Binary Tree
  - [ ] Maximum Depth of Binary Tree

### 🏗️ System Design
- [ ] Sketch a **Caching Strategy** design:
  - [ ] Cache-aside vs write-through vs write-behind
  - [ ] Redis as a cache layer for your app
  - [ ] Cache invalidation strategies

### 🌟 Portfolio / Personal Brand
- [ ] **Phase 1 milestone**: make sure `world-class-dev-journey` repo has:
  - [ ] Clean README per folder
  - [ ] At least 1 running full-stack app (even simple)
  - [ ] At least 10 DSA solutions with notes
- [ ] **Write first blog post / dev.to article** (e.g., "React performance patterns I used this month")

### 📓 Phase 1 Retrospective
- [ ] Update `notes/weekly_log.md` with Phase 1 summary:
  - Skills sharpened
  - Projects built
  - DSA problems solved (count)
  - What was hard
  - What to focus on in Phase 2
- [ ] Move unfinished tasks → Week 5 `## 🔁 Rolled Over`

---

---

# PHASE 2 — Full-Stack + System Design (Weeks 5–8)

---

## 📅 Week 5 (2026-04-13 → 2026-04-19)
**Theme:** Start full-stack capstone project. Redis caching. scikit-learn pipelines.

### 🔁 Rolled Over from Phase 1
_Paste here._

### ⚛️ React / Frontend
- [ ] Plan capstone app UI:
  - [ ] Wireframe 3–5 screens (pen/paper or Figma)
  - [ ] Define component tree
- [ ] Start building capstone frontend in `frontend/capstone/`
- [ ] Set up design tokens (colors, spacing, typography)

### 🖥️ Full-Stack / Capstone
- [ ] Define capstone app scope (examples: job tracker, expense tracker, AI-powered notes)
- [ ] Set up `backend/capstone/` with proper folder structure:
  - `routes/`, `controllers/`, `services/`, `models/`, `middleware/`
- [ ] Implement user auth end-to-end (register, login, JWT refresh)
- [ ] Add **Redis** caching for a list endpoint

### 🤖 AI / ML
- [ ] **scikit-learn pipelines** in `ml/sklearn_pipeline.ipynb`:
  - [ ] `Pipeline` with preprocessor + model
  - [ ] `ColumnTransformer` for mixed types
  - [ ] `GridSearchCV` for hyperparameter tuning
- [ ] Train + evaluate pipeline on a real dataset

### 🗄️ Data Engineering
- [ ] Build a more complete ETL pipeline in `data-eng/etl_v2.py`:
  - [ ] Source: a public API (e.g., weather, GitHub API)
  - [ ] Transform + validate
  - [ ] Load into Postgres
- [ ] Schedule it with Airflow/Prefect DAG

### 🧮 DSA (Pattern: Trees, BFS/DFS)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] Level Order Traversal
  - [ ] Validate BST
  - [ ] Lowest Common Ancestor of BST
  - [ ] Number of Islands

### 🏗️ System Design
- [ ] Sketch **Notification System** design
- [ ] Study: message queues (concept: RabbitMQ/Kafka-style)

### 📓 Weekly Retrospective
- [ ] Update log, roll over tasks

---

## 📅 Week 6 (2026-04-20 → 2026-04-26)
**Theme:** Capstone: full CRUD + file uploads. GraphQL intro. ML with neural nets.

### 🔁 Rolled Over
_Paste here._

### ⚛️ React / Frontend
- [ ] Build out capstone CRUD screens (create, list, detail, edit, delete)
- [ ] Add loading states, error boundaries, empty states
- [ ] Implement optimistic UI updates on mutations

### 🖥️ Full-Stack
- [ ] Add file upload endpoint (multer or FastAPI UploadFile)
- [ ] Explore **GraphQL** basics:
  - [ ] Set up a simple GraphQL endpoint
  - [ ] Query and mutation for one resource
- [ ] Add structured logging (winston/pino or Python logging)

### 🤖 AI / ML
- [ ] Deep learning: CNNs in `ml/cnn_intro.ipynb`:
  - [ ] Build a simple CNN on CIFAR-10 or MNIST
  - [ ] Understand conv layers, pooling, flatten
- [ ] Learn: dropout, batch normalization (concept + code)

### 🗄️ Data Engineering
- [ ] Study **data warehouse concepts**:
  - [ ] OLTP vs OLAP
  - [ ] BigQuery / Snowflake architecture (conceptual)
  - [ ] Partitioning and clustering
- [ ] Write notes in `data-eng/warehouse_concepts.md`

### 🧮 DSA (Pattern: Binary Search, Heap)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] Binary Search
  - [ ] Find Minimum in Rotated Sorted Array
  - [ ] Kth Largest Element in Array
  - [ ] Top K Frequent Elements

### 🏗️ System Design
- [ ] Sketch **File Storage System** (like S3-lite):
  - [ ] Chunking, metadata DB, storage nodes

### 📓 Weekly Retrospective
- [ ] Update log, roll over tasks

---

## 📅 Week 7 (2026-04-27 → 2026-05-03)
**Theme:** Capstone deployment. Docker. ML model served via API.

### 🔁 Rolled Over
_Paste here._

### ⚛️ React / Frontend
- [ ] Polish capstone UI: responsive design, dark mode toggle
- [ ] Lighthouse audit: hit 90+ on performance, accessibility, best practices
- [ ] Add skeleton loaders and suspense boundaries

### 🖥️ Full-Stack
- [ ] **Dockerize** frontend + backend:
  - [ ] `Dockerfile` for each
  - [ ] `docker-compose.yml` to run full stack + Postgres + Redis
- [ ] Set up **GitHub Actions** CI:
  - [ ] Lint + test on PR
  - [ ] Build Docker image on merge to main

### 🤖 AI / ML
- [ ] Train a model and **serve it via a REST API**:
  - [ ] Save model (`joblib` or `torch.save`)
  - [ ] Create a FastAPI endpoint: POST `/predict` → returns prediction
  - [ ] Test from frontend with a simple form
- [ ] This is your first ML-powered full-stack feature! 🎉

### 🗄️ Data Engineering
- [ ] **Apache Spark basics** (even locally):
  - [ ] Install PySpark
  - [ ] Read a CSV into a Spark DataFrame
  - [ ] Filter, group by, aggregate
  - [ ] Write notes in `data-eng/spark_basics.md`

### 🧮 DSA (Pattern: Linked Lists, Stack, Queue)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] Reverse Linked List
  - [ ] Merge Two Sorted Lists
  - [ ] Valid Parentheses
  - [ ] Min Stack

### 🏗️ System Design
- [ ] Sketch **E-Commerce System** (products, orders, payments):
  - [ ] DB schema
  - [ ] Payment flow
  - [ ] Eventual consistency concepts

### 🌟 Portfolio
- [ ] Deploy capstone to a free host (Render, Railway, Vercel)
- [ ] Write blog post #2: "How I built and deployed a full-stack app in 4 weeks"

### 📓 Weekly Retrospective
- [ ] Update log, roll over tasks

---

## 📅 Week 8 (2026-05-04 → 2026-05-10)
**Theme:** Phase 2 consolidation + capstone polish + mock interview #1.

### 🔁 Rolled Over
_Paste here._

### ⚛️ React / Frontend
- [ ] Final capstone frontend polish
- [ ] Write comprehensive tests (aim for 70%+ component coverage)
- [ ] Document component API in README

### 🖥️ Full-Stack
- [ ] API documentation complete (Swagger or Postman)
- [ ] Add rate limiting to API (express-rate-limit or FastAPI middleware)
- [ ] Basic monitoring: uptime + error rate endpoint

### 🤖 AI / ML
- [ ] Intro to **NLP basics**:
  - [ ] Tokenization, stopwords, TF-IDF
  - [ ] Train a simple text classifier (spam/not spam) with scikit-learn
- [ ] Add a simple NLP feature to capstone (e.g., auto-tag notes)

### 🗄️ Data Engineering
- [ ] Build a **data pipeline project** in `data-eng/pipeline_v1/`:
  - [ ] Ingest from API → Spark transform → load to Postgres warehouse table
  - [ ] Schedule with Airflow/Prefect
  - [ ] Add a simple dbt-style transformation layer (or just SQL views)

### 🧮 DSA (Pattern: Backtracking, Greedy)
- [ ] Solve 5–7 problems
- [ ] Suggested:
  - [ ] Subsets
  - [ ] Combination Sum
  - [ ] Jump Game
  - [ ] Meeting Rooms

### 🏗️ System Design
- [ ] **Mock system design interview** (time yourself 45 min):
  - [ ] Design: "Design YouTube"
  - [ ] Cover: storage, streaming, CDN, metadata DB, recommendations

### 💼 Interview Prep
- [ ] **Mock coding interview #1**:
  - [ ] Pick 3 medium LeetCode problems
  - [ ] Solve each in 20 min max, explain out loud
  - [ ] Review solutions, note gaps

### 📓 Phase 2 Retrospective
- [ ] Full summary in `notes/weekly_log.md`
- [ ] Count DSA problems solved total (target: 40–50 by now)
- [ ] List deployed projects (target: 1 live capstone app)
- [ ] Adjust Phase 3 plan based on energy/interests

---

---

# PHASE 3 — AI/ML Deep Dive (Weeks 9–16)

*(Detailed week-by-week plan to be expanded at end of Phase 2 based on your progress.  
Below are the confirmed weekly themes — fill in tasks using the template.)*

| Week | Theme |
|------|-------|
| 9 | PyTorch fundamentals — tensors, autograd, training loop |
| 10 | Deep learning: RNNs, LSTMs, sequence models |
| 11 | Transformers architecture + HuggingFace basics |
| 12 | **LLMs & Applied AI**: OpenAI/Anthropic API, prompt engineering |
| 13 | Embeddings, vector search (pgvector/Pinecone), RAG basics |
| 14 | Build LLM-powered feature in capstone app |
| 15 | ML in production: model versioning, MLflow, experiment tracking |
| 16 | Phase 3 project: end-to-end ML app (train → serve → UI) |

**DSA Phase 3:** Dynamic Programming (Weeks 13–16)  
**System Design Phase 3:** ML system design (feature store, model serving, monitoring)

---

---

# PHASE 4 — Data Engineering + Production Systems (Weeks 17–24)

*(Themes confirmed, expand week-by-week at end of Phase 3.)*

| Week | Theme |
|------|-------|
| 17 | Advanced Airflow/Prefect: DAG dependencies, retries, sensors |
| 18 | dbt for data transformation: models, tests, documentation |
| 19 | Kafka/streaming basics: producers, consumers, topics |
| 20 | Data lake concepts + Delta Lake/Iceberg intro |
| 21 | Cloud data engineering: BigQuery or Redshift + S3 |
| 22 | End-to-end data platform project |
| 23 | Interview prep intensive: DSA hard problems + system design |
| 24 | Mock interviews + portfolio review + job applications 🚀 |

**DSA Phase 4:** Graphs, Tries, Advanced DP, Hard problems  
**System Design Phase 4:** Data-intensive systems, streaming pipelines

---

---

# 🗂️ Backlog (Future Ideas — Add/Remove Freely)

- [ ] WebSockets: real-time chat feature in capstone
- [ ] gRPC: replace one REST endpoint with gRPC
- [ ] React Native: build a mobile version of capstone
- [ ] Kubernetes: deploy capstone to a K8s cluster
- [ ] Reinforcement Learning basics
- [ ] Computer Vision project (custom dataset)
- [ ] Contribute to an open-source React project
- [ ] Build a personal portfolio website
- [ ] Build a CLI tool with Node.js

---

# ⏸️ Paused Topics (Removed from Active Plan)

_Move topics here when you want to deprioritize them without losing them._

---

# 📓 Progress Log

## Week 1 Summary
- **Completed:** _(fill at end of week)_
- **Rolled over:** _(list tasks)_
- **DSA count:** _ / target 10
- **Key learnings:** _(1–3 bullets)_
- **Next week focus adjustment:** _(any change?)_

## Week 2 Summary
_(fill at end of Week 2)_

---

# 💼 Interview Prep Tracker

| Date | Type | Topic | Result | Notes |
|------|------|-------|--------|-------|
| | Coding | | | |
| | System Design | | | |
| | Behavioral | | | |

---

# 🔢 DSA Problem Tracker

| # | Problem | Pattern | Difficulty | Date | Notes |
|---|---------|---------|-----------|------|-------|
| 1 | | Arrays | Easy | | |

---
