import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Aavegotchi, Owner, Vault } from "../generated/schema";

export function getOrCreateVault(address: Address): Vault {
    let vault = Vault.load(address.toHexString());
    if(!vault) {
        vault = new Vault(address.toHexString());
    }
    return vault;
}

export function getOrCreateAavegotchi(id: BigInt): Aavegotchi {
    let gotchi = Aavegotchi.load(id.toString());
    if(!gotchi) {
        gotchi = new Aavegotchi(id.toString());
    }
    return gotchi;
}

export function getOrCreateOwner(address: Address): Owner {
    let owner = Owner.load(address.toHexString());
    if(!owner) {
        owner = new Owner(address.toHexString());
    }
    return owner;
}