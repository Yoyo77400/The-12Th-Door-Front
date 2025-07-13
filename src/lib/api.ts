import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

// ============ MATCH NFT =============

// Récupérer un Match NFT précis (par matchId et wallet)
export const getMatchNFT = async (matchId: string, walletAddress: string) => {
  const { data } = await axios.get(
    `${API_BASE}/match-nft/${matchId}/${walletAddress}`
  );
  return data;
};

// Créer/claim un NFT de match pour un utilisateur
export const createMatchNFT = async (matchId: string, walletAddress: string) => {
  const { data } = await axios.post(`${API_BASE}/match-nft/create`, {
    data: { matchId, walletAddress },
  });
  return data;
};

// Mettre à jour la rareté d'un NFT de match (admin seulement)
export const setMatchNFTRarity = async (id: string, rarity: string) => {
  const { data } = await axios.post(
    `${API_BASE}/match-nft/${id}/set-rarity`,
    { rarity }
  );
  return data;
};

// Lister tous les NFTs de match pour un wallet
export const getWalletMatchNFTs = async (walletAddress: string) => {
  const { data } = await axios.get(
    `${API_BASE}/match-nft/wallet/${walletAddress}/nfts`
  );
  return data;
};

// ============ FIDELITY NFT =============

// Récupérer le NFT fidélité du wallet pour une saison
export const getFidelityNFT = async (walletAddress: string, seasonId: string) => {
  const { data } = await axios.get(
    `${API_BASE}/fidelity-nft/${walletAddress}/${seasonId}`
  );
  return data;
};

// Claim/créer un NFT fidélité
export const createFidelityNFT = async (walletAddress: string, seasonId: string) => {
  const { data } = await axios.post(`${API_BASE}/fidelity-nft/create`, {
    data: { walletAddress, seasonId },
  });
  return data;
};

// Lister tous les NFTs fidélité d’un wallet
export const getWalletFidelityNFTs = async (walletAddress: string) => {
  const { data } = await axios.get(
    `${API_BASE}/fidelity-nft/wallet/${walletAddress}/nfts`
  );
  return data;
};

// ============ SEASON & MATCH INFO =============

// Récupérer les saisons existantes
export const getSeasons = async () => {
  const { data } = await axios.get(`${API_BASE}/season/list`);
  return data;
};

// Récupérer la liste des matchs (tu peux filtrer par saison, club, etc)
export const getMatches = async () => {
  const { data } = await axios.get(`${API_BASE}/match/list`);
  return data;
};

export const getMatchById = async (matchId: string) => {
  const { data } = await axios.get(`${API_BASE}/match/${matchId}`);
  return data;
};

// ============ REWARDS GLOBAL =============

// Récupérer tous les NFTs d'un wallet (match + fidelity, si tu fais une route dédiée)
export const getAllWalletNFTs = async (walletAddress: string) => {
  const { data } = await axios.get(`${API_BASE}/rewards/wallet/${walletAddress}/all-nfts`);
  return data;
};

// ============ IMAGES / UPLOAD =============

// Uploader une image (multipart/form-data)
export const uploadImage = async (file: File, nftId: string, type: "match" | "fidelity") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("nftId", nftId);
  formData.append("type", type);
  const { data } = await axios.post(`${API_BASE}/image/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
};


