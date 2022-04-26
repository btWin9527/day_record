// hooks
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useMemo} from "react";
import * as actionTypes from "./actions";

const modalCallbacks = {}

export const useCustomModal = (modalId) => {
  const dispatch = useDispatch()

  const show = useCallback((args) => {
    return new Promise((resolve) => {
      modalCallbacks[modalId] = resolve
      dispatch(actionTypes.showModal(modalId, args))
    })
  }, [dispatch, modalId])

  const resolve = useCallback((args) => {
    if (modalCallbacks[modalId]) {
      modalCallbacks[modalId](args)
      delete modalCallbacks[modalId]
    }
  }, [modalId])

  const hide = useCallback((force) => {
    dispatch(actionTypes.hideModal(modalId, force))
    delete modalCallbacks[modalId]
  }, [dispatch, modalId])

  const args = useSelector(s => s[modalId])
  const hiding = useSelector(s => s.hiding[modalId])

  return useMemo(
    () => ({args, hiding, visible: !!args, show, hide, resolve}),
    [args, hide, show, resolve, hiding]
  )
}