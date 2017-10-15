<template>
  <div class="dropdown is-right is-hoverable">
  <div class="dropdown-trigger">
    <span class="icon" @click="modalVisible = true">
          <i class="fa fa-ellipsis-v"></i>
        </span>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item"
        @click="$emit('edit')">
        Renomear 
      </a>
      <a class="dropdown-item">
        Remover
      </a>
    </div>
  </div>
</div>
</template>
