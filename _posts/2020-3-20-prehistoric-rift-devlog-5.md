---
layout: post
title:  "Prehistoric Rift Devlog #5: A New Problem"
comments: true
---

Welp it's been a while ever since I have even touched this site. Welp, today I'd like to talk about this problem I've been facing ever since the creation of this addon, and that's no other than dealing with the roar ability of the Tyrannosaurus...

## How it's supposed to go
* When riding the Tyranno, it activates a BP animation controller that removes a component group with `minecraft:sittable`
* The component group gets replaced with a component group that has `minecraft:interact`
* The filters in that component make sure that it will only activate if:
  * The player has a command staff and is riding the mob
  * The mob is not a baby and is tamed
  * The rider count is more than 0
* Once the filters approve of this, it activates a client animation that's essentially a roar animation, a sound, and the BP anim controller from before gives the mob a tag that mobs will run away from
In theory this all sounds simple but...

## How it ends up as
<img src="{{ site.baseurl }}/images/devlog 5/pink-wojak.jpeg" width="100" height="100" text-align="left" style="float:left; padding:1 15px;">
Nothing fucking happens! Like seriously. It does roar, but nothing else fucking activates. For now I'm gonna try solve this by making tamed and wild mobs different entities, so expect yet another dumb delay. See y'all soon I guess.
<div style="clear:both;"></div>