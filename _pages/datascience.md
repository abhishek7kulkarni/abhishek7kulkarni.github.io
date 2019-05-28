---
layout: single
permalink: /datascience/
title: "Data Science Posts"
author_profile: true
header:
  image: "images/liffey.jpg"
---

<ul>
  {% for post in site.categories.datascience %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
