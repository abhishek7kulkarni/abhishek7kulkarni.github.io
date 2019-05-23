---
layout: default
permalink: /datascience/
title: "Data Science Posts"
author_profile: true
header:
  image: "images/liffey.jpg"
---

<h1>Latest Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
