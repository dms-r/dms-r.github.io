---
layout: single
permalink: /projects/index.html
title: "$ cd projects/"
classes: wide
author_profile: true
---

<style>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.project-card {
  background-color:rgb(33, 42, 56);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 8px rgb(83, 83, 83);
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 0.1rem;
}

.project-title {
  font-size: 1rem;
  color:rgba(72, 146, 214, 0.93);
  margin-top: 0.5rem;
}

.project-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.88);
  margin: 0.5rem;
}

.tech-stack {
  font-size: 0.5rem;
  color: rgb(131, 173, 207);
}
</style>

<div class="project-grid">
  {% for project in site.data.projects %}
    <div class="project-card">
      <a href="{{ project.url }}" class="project-title">{{ project.title }}</a>
      <p class="project-description">{{ project.description }}</p>
      <p class="tech-stack"><strong>Tech Stack:</strong> {{ project.technologies | join: ", " }}</p>
      <img src="{{ project.image }}" alt="{{ project.title }}">
    </div>
  {% endfor %}
</div>
