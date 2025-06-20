// components/AddCompetitorDialog.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "..//..//supabase-client";

export default function AddCompetitorDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("users").insert([{ username }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setUsername("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#0c0c0f] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">
            Add Competitor
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-[#1a1a1d] text-white border-gray-700 cursor-none"
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <DialogFooter className="flex justify-start">
            <Button
              type="button"
              variant="outline"
              className="cursor-none bg-[#161616]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant={"default"}
              className="cursor-none"
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
