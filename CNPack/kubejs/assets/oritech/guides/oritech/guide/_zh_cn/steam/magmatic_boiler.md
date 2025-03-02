---
navigation:
  title: "基础蒸汽能量搭建"
  icon: "oritech:steam_engine_block"
  position: 252
  parent: oritech:steam.md
item_ids:
  - oritech:lava_generator_block
  - oritech:steam_engine_block
  - oritech:steam_boiler_addon
---

# 基础蒸汽能量搭建



### 如何使用蒸汽能量

<GameScene zoom="4" interactive={true}>
    <ImportStructure src="steam_setup.nbt" />
    <IsometricCamera yaw="165" pitch="30" />
    <BoxAnnotation color="#dddddd" min="5 0 0" max="6 1 1">
        将熔岩源泵入岩浆锅炉
    </BoxAnnotation>
    <BoxAnnotation color="#dddddd" min="6 0 4" max="5 1 5">
        将水源泵入蒸汽锅炉插件
    </BoxAnnotation>
    <DiamondAnnotation pos="3.5 0.5 2.5" color="#00ff00">
        将蒸汽泵入蒸汽机
    </DiamondAnnotation>
    <DiamondAnnotation pos="2.5 0.5 3.5" color="#ADD8E6">
        将多余的水排入流体垃圾桶
    </DiamondAnnotation>
    <DiamondAnnotation pos="0.5 0.5 2.5" color="#FF0000">
        能量传入存储
    </DiamondAnnotation>
</GameScene>

