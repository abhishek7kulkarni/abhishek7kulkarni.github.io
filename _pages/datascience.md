---
layout: single
permalink: /datascience/
title: "Data Science Posts"
author_profile: true
header:
  image: "images/liffey.jpg"
---

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    </li>
  {% endfor %}
</ul>
