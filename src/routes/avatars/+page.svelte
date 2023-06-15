<script lang="ts">
  import { type Area, AREAS } from './lib/avatars'

  import { sessionStore } from '$src/stores'
  import { avatarsStore } from '$routes/avatars/stores'
  import Container from '$routes/avatars/components/Container.svelte'
  import Summon from '$routes/avatars/components/Summon.svelte';
  import Transmogrify from '$routes/avatars/components/Transmogrify.svelte';

  function handleChangeTab(area: Area) {
    avatarsStore.update(store => ({
      ...store,
      selectedArea: area
    }))
  }
</script>

<div class="p-2 mb-14 text-center">
  {#if $sessionStore.session}
    <div class="flex items-center justify-center translate-y-1/2 w-fit m-auto">
      <div class="tabs border-2 overflow-hidden border-base-content rounded-lg">
        {#each AREAS as area}
          <button
            on:click={() => handleChangeTab(area)}
            class="tab h-10 font-bold text-body-sm ease-in {$avatarsStore.selectedArea ===
            area
              ? 'tab-active bg-base-content text-base-100'
              : 'bg-base-100 text-base-content'}"
          >
            {area}
          </button>
        {/each}
      </div>
    </div>

    <Container>
      {#if $avatarsStore.selectedArea === 'Transmogrify'}
        <Transmogrify />
      {:else if $avatarsStore.selectedArea === 'Summon'}
        <Summon />
      {/if}
    </Container>
  {/if}
</div>
