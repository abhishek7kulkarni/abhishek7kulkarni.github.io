---
layout: single
permalink: /programming/
title: "Programming Posts"
author_profile: true
header:
  image: "images/ucdblue.jpg"
---

<ul>
  {% for post in site.categories.programming %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
