import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SuList from './List.vue';
import type { SuListProps, Action, ButtonConfig } from './type';

describe('SuList.vue', () => {
    const testColumns = [
        { label: 'ID', value: 'id' },
        { label: 'Name', value: 'name' },
    ];

    const testData = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
    }));

    const testActions: Action[] = [
        { label: 'Edit', emit: 'edit-user' },
        { label: 'Delete', emit: 'delete-user' },
    ];

    const defaultProps: SuListProps = {
        column: testColumns,
        data: [],
        pageData: { data: [], actions: [] },
        paginationType: 'external',
        pageSize: 10,
        currentPage: 1,
        total: 0,
        showFilters: true,
        showNavButtons: true,
        showNavIcons: true,
        showActionsColumn: true,
        showElevator: false,
        mode: 'full',
        mynavs: [],
        selectBt: [],
        naVBt: [],
        navIc: [],
        selectable: false,
        rowKey: 'id',
        theme: 'ocean-blue',
        plain: false,
    };

    it('should mount and render the basic structure', () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                pageData: { data: testData.slice(0, 2), actions: [] },
            },
        });
        expect(wrapper.find('.su-list').exists()).toBe(true);
        expect(wrapper.classes()).toContain('theme-ocean-blue');
        expect(wrapper.find('.su-list__table-header').exists()).toBe(true);
        expect(wrapper.find('.su-list__table-body').exists()).toBe(true);
        expect(wrapper.find('.su-list__pagination').exists()).toBe(true);
    });

    it('should apply the correct theme and plain classes', () => {
        const wrapper = mount(SuList, {
            props: { ...defaultProps, theme: 'sunset-glow', plain: true }
        });
        expect(wrapper.classes()).toContain('theme-sunset-glow');
        expect(wrapper.classes()).toContain('is-plain');
    });

    it('should render data rows correctly', () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                pageData: { data: testData.slice(0, 3), actions: [] },
            },
        });
        const rows = wrapper.findAll('.su-list__table-body .su-list__table-row');
        expect(rows).toHaveLength(3);
        expect(rows[0].text()).toContain('User 1');
        expect(rows[2].text()).toContain('User 3');
    });

    it('should handle internal pagination correctly', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                paginationType: 'internal',
                data: testData,
                pageSize: 5,
                currentPage: 1,
            },
        });

        expect(wrapper.findAll('.su-list__table-body .su-list__table-row')).toHaveLength(5);
        expect(wrapper.find('.su-list__page-info-current').text()).toBe('1');

        const nextButton = wrapper.findAll('.su-list__pagination .su-button').find(btn => btn.text().includes('下一页'));
        await nextButton!.trigger('click');

        expect(wrapper.find('.su-list__page-info-current').text()).toBe('2');
        const rows = wrapper.findAll('.su-list__table-body .su-list__table-row');
        expect(rows[0].text()).toContain('User 6');
    });

    it('should emit update:currentPage for external pagination', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                paginationType: 'external',
                pageData: { data: testData.slice(0, 5), actions: [] },
                total: 25,
            },
        });

        const nextButton = wrapper.findAll('.su-list__pagination .su-button').find(btn => btn.text().includes('下一页'));
        await nextButton!.trigger('click');
        expect(wrapper.emitted('update:currentPage')![0][0]).toBe(2);
    });

    it('should emit a custom event when a nav button is clicked', async () => {
        const navButtons: ButtonConfig[] = [{ label: 'Add New', emit: 'add-item' }];
        const wrapper = mount(SuList, {
            props: { ...defaultProps, naVBt: navButtons },
        });

        await wrapper.find('.su-list__nav-buttons .su-button').trigger('click');
        expect(wrapper.emitted('add-item')).toBeTruthy();
    });

    it('should emit an event with row data when a row action is clicked', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                pageData: { data: testData.slice(0, 1), actions: testActions },
            },
        });

        await wrapper.find('.su-list__table-cell--actions .su-button').trigger('click');

        const emittedEvent = wrapper.emitted('edit-user');
        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent![0][0]).toEqual(testData[0]);
    });

    it('should correctly toggle column visibility', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                pageData: { data: testData.slice(0, 1), actions: [] },
            },
        });

        expect(wrapper.find('.su-list__table-header').text()).toContain('Name');
        await wrapper.findAll('.su-list__col-toggle-item')[1].trigger('click');
        expect(wrapper.find('.su-list__table-header').text()).not.toContain('Name');
    });

    it('should emit selection-change with an array of keys when a row is selected', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                selectable: true,
                pageData: { data: testData.slice(0, 2), actions: [] },
            },
        });

        await wrapper.find('.su-list__table-body .su-list__table-cell--selection input[type="checkbox"]').setValue(true);

        const emittedEvent = wrapper.emitted('selection-change');
        expect(emittedEvent).toBeDefined();
        expect(emittedEvent![0][0]).toEqual([1]);
    });

    it('should correctly jump to a page using the elevator', async () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                total: 25,
                showElevator: true,
            },
        });
        const input = wrapper.find('.su-list__page-input');
        await input.setValue('4');
        await input.trigger('keyup.enter');

        expect(wrapper.emitted('update:currentPage')![0][0]).toBe(4);
    });

    it('should hide elements based on mode and props', () => {
        const wrapper = mount(SuList, {
            props: {
                ...defaultProps,
                showFilters: false,
                showNavButtons: false,
                mode: 'simple',
            },
        });

        expect(wrapper.find('.su-list__filters').exists()).toBe(false);
        expect(wrapper.find('.su-list__nav').exists()).toBe(false);
        expect(wrapper.find('.su-list__col-toggle-bar').exists()).toBe(false);
    });
});