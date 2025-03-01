<template>
	<v-list large>
		<template v-if="customNavItems && customNavItems.length > 0">
			<template v-for="(group, index) in customNavItems">
				<template
					v-if="(group.name === undefined || group.name === null) && group.accordion === 'always_open' && index === 0"
				>
					<v-list-item :exact="exact" v-for="navItem in group.items" :key="navItem.to" :to="navItem.to">
						<v-list-item-icon><v-icon :name="navItem.icon" /></v-list-item-icon>
						<v-list-item-content>
							<v-text-overflow :text="navItem.name" />
						</v-list-item-content>
					</v-list-item>
				</template>
				<template v-else>
					<v-detail
						:active="group.accordion === 'always_open' || isActive(group.name)"
						:disabled="group.accordion === 'always_open'"
						:start-open="group.accordion === 'start_open'"
						:label="group.name || null"
						:key="group.name"
						@toggle="toggleActive(group.name)"
					>
						<v-list-item :exact="exact" v-for="navItem in group.items" :key="navItem.to" :to="navItem.to">
							<v-list-item-icon><v-icon :name="navItem.icon" /></v-list-item-icon>
							<v-list-item-content>
								<v-text-overflow :text="navItem.name" />
							</v-list-item-content>
						</v-list-item>
					</v-detail>
				</template>
			</template>
		</template>

		<v-list-item v-else :exact="exact" v-for="navItem in navItems" :key="navItem.to" :to="navItem.to">
			<v-list-item-icon><v-icon :name="navItem.icon" /></v-list-item-icon>
			<v-list-item-content>
				<v-text-overflow :text="navItem.name" />
			</v-list-item-content>
		</v-list-item>

		<template v-if="bookmarks.length > 0">
			<v-divider />

			<navigation-bookmark v-for="bookmark of bookmarks" :key="bookmark.id" :bookmark="bookmark" />
		</template>

		<div v-if="!customNavItems && !navItems.length && !bookmarks.length" class="empty">
			<template v-if="isAdmin">
				<v-button fullWidth outlined dashed to="/settings/data-model/+">{{ $t('create_collection') }}</v-button>
			</template>
			<template v-else>
				{{ $t('no_collections_copy') }}
			</template>
		</div>
	</v-list>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import useNavigation from '../composables/use-navigation';
import { usePresetsStore, useUserStore } from '@/stores/';
import { orderBy } from 'lodash';
import NavigationBookmark from './navigation-bookmark.vue';

export default defineComponent({
	components: { NavigationBookmark },
	props: {
		exact: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const presetsStore = usePresetsStore();
		const { customNavItems, navItems, activeGroups } = useNavigation();
		const userStore = useUserStore();
		const isAdmin = computed(() => userStore.state.currentUser?.role.admin_access === true);

		const bookmarks = computed(() => {
			return orderBy(
				presetsStore.state.collectionPresets
					.filter((preset) => {
						return preset.bookmark !== null && preset.collection.startsWith('directus_') === false;
					})
					.map((preset) => {
						let scope = 'global';
						if (!!preset.role) scope = 'role';
						if (!!preset.user) scope = 'user';

						return {
							...preset,
							to: `/collections/${preset.collection}?bookmark=${preset.id}`,
							scope,
						};
					}),
				['bookmark'],
				['asc']
			);
		});

		return { navItems, bookmarks, customNavItems, isAdmin, activeGroups, isActive, toggleActive };

		function isActive(name: string) {
			return activeGroups.value.includes(name);
		}

		function toggleActive(name: string) {
			if (activeGroups.value.includes(name)) {
				activeGroups.value = activeGroups.value.filter((current: string) => current !== name);
			} else {
				activeGroups.value.push(name);
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.group-name {
	padding-left: 8px;
	font-weight: 600;
}

.empty {
	color: var(--foreground-subdued);
	.v-button {
		--v-button-background-color: var(--foreground-subdued);
		--v-button-background-color-hover: var(--primary);
	}
}
</style>
