import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsInput extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.InputContextMenu
  readonly inputName: string
}

export interface ContextMenuPropsList extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Search
  readonly index: number
}

export type ContextMenuProps = ContextMenuPropsInput | ContextMenuPropsList
