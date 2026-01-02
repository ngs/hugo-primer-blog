---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
tags: []
categories: []
archives: ["{{ dateFormat "2006-01" .Date }}"]
author: ""
description: ""
---
