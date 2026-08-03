# CampusSync 🎓💡

**CampusSync** is a modern, full-stack help-desk and support-ticket management platform designed for educational institutions. It streamlines campus support by organizing incoming student inquiries into actionable tickets, automating status workflows, and providing multi-role administrative controls.

---

## 🌟 Key Features

* **Multi-Role Access Control**: Tailored interfaces and permission levels for Students, System Admins, and Support Staff.
* **Ticket Lifecycle Management**: Categorize and transition tickets across **Pending**, **Resolved**, and **Spam** states.
* **Automated Support Integration**: Integrates chatbot interactions to triage common queries before escalating to admins.
* **RESTful Architecture**: Clean Node.js / Express backend with CORS integration for secure client requests.
* **Continuous Deployment**: Automated deployment pipeline connected via Vercel and GitHub.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Backend**: Node.js, Express.js
* **Deployment**: Vercel (`campus-sync-olive-sigma.vercel.app`)
* **Version Control**: Git & GitHub

---

## 🚀 Live Demo

* **Web Application**: [CampusSync Live](https://campus-sync-olive-sigma.vercel.app)

---

## 💻 Local Setup & Installation

Follow these steps to run CampusSync locally on your machine:

### Prerequisites
* Node.js (v16.x or higher)
* npm (Node Package Manager)

### Steps

1. **Clone the Repository**
   git clone https://github.com/nd4534/campus-sync.git
   cd campus-sync

2. **Install Dependencies**
   npm install

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your configuration details:
   PORT=5000
   NODE_ENV=development

4. **Run the Development Server**
   npm start
   
   Open your browser and navigate to `http://localhost:5000`.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tickets` | Submit a new support ticket | Public / Student |
| `GET` | `/api/tickets` | Retrieve all tickets | Admin |
| `PATCH` | `/api/tickets/:id` | Update ticket status (e.g., Pending -> Resolved) | Admin |
| `DELETE` | `/api/tickets/:id` | Flag or remove spam tickets | Admin |

---

## 📂 File Structure

```text
HELP DESK/
├── routes/
│   ├── admin.js
│   ├── chatbot.js
│   └── user.js
├── .gitignore
├── admin_chat.html
├── admin_dashboard.html
├── admin_feedback.html
├── admin_misc.html
├── admin_moderation.html
├── admin_settings.html
├── admin_ticket_detail.html
├── command_centre.html
├── complaint.html
├── dashboard.html
├── feedback.html
├── list_misc.html
├── list_pending.html
├── list_resolved.html
├── list_spam.html
├── login.html
├── logo.png
├── package-lock.json
├── package.json
├── query.html
├── README.md
├── server.js
├── settings.html
├── ticket_detail.html
└── vercel.json