import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  Transfer
} from "../generated/Contract/Contract"
import { VAULT_ADDRESS } from "./constants"
import { getOrCreateAavegotchi, getOrCreateOwner, getOrCreateVault } from "./helper"

export function handleTransfer(event: Transfer): void {
  // deposit
  if(event.params._to.equals(VAULT_ADDRESS)) {
    let vault = getOrCreateVault(event.params._to);
    let gotchi = getOrCreateAavegotchi(event.params._tokenId);
    let owner = getOrCreateOwner(event.params._from);
    gotchi.vault = vault.id;
    gotchi.owner = owner.id;
    gotchi.save();

    vault.numGotchis = vault.numGotchis.plus(BigInt.fromI32(1));
    vault.save();

    owner.numGotchis = owner.numGotchis.plus(BigInt.fromI32(1));
    owner.save();
  } 
  // withdraw
  else if(event.params._from.equals(VAULT_ADDRESS)) {
    let vault = getOrCreateVault(event.params._to);
    vault.numGotchis = vault.numGotchis.plus(BigInt.fromI32(1));
    vault.save();

    store.remove("Aavegotchi", event.params._tokenId.toString())
    
    let owner = getOrCreateOwner(event.params._from);
    owner.numGotchis = owner.numGotchis.minus(BigInt.fromI32(1));
    if(owner.numGotchis.equals(BigInt.fromI32(0))) {
      store.remove("Owner", owner.id)
    } else {
      owner.save();
    }
    
  }
}

// export function handleUpdateItemPrice(event: UpdateItemPrice): void {}
