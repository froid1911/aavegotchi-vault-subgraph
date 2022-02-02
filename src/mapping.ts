import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  Transfer
} from "../generated/Contract/Contract"
import { VAULT_ADDRESS } from "./constants"
import { getOrCreateAavegotchi, getOrCreateVault } from "./helper"

export function handleTransfer(event: Transfer): void {
  // deposit
  if(event.params._to.equals(VAULT_ADDRESS)) {
    let vault = getOrCreateVault(event.params._to);
    let gotchi = getOrCreateAavegotchi(event.params._tokenId);
    gotchi.vault = vault.id;
    gotchi.owner = event.transaction.from;
    gotchi.save();
  } 
  // withdraw
  else if(event.params._from.equals(VAULT_ADDRESS)) {
    store.remove("Aavegotchi", event.params._tokenId.toString())
  }
}

// export function handleUpdateItemPrice(event: UpdateItemPrice): void {}
