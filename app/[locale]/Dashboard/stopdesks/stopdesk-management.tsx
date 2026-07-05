"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { StopDesk, createEmptyStopDesk, WILAYA_LIST, DEFAULT_WORKING_DAYS,TIME_OPTIONS  } from "@/lib/stopdesk-types";
import { generateUniqueCode, convertToIframeUrl } from "@/lib/stopdesk-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { Plus, Pencil, Trash2, MapPin, Phone, Clock, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";

export default function StopdeskManagement() {
  const [stopdesks, setStopdesks] = useState<StopDesk[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingStopdesk, setEditingStopdesk] = useState<StopDesk | null>(null);
  const [stopdeskToDelete, setStopdeskToDelete] = useState<StopDesk | null>(null);
  const [formData, setFormData] = useState<StopDesk>(createEmptyStopDesk(""));
  const [searchQuery, setSearchQuery] = useState("");

  // Filter stopdesks based on search query
  const filteredStopdesks = stopdesks.filter((stopdesk) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      stopdesk.name.toLowerCase().includes(query) ||
      stopdesk.stopdesk_code.toLowerCase().includes(query) ||
      stopdesk.wilaya.toLowerCase().includes(query) ||
      stopdesk.commune.toLowerCase().includes(query) ||
      stopdesk.phone.includes(query) ||
      stopdesk.adresse.toLowerCase().includes(query)
    );
  });

  const fetchStopdesks = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "EcoStop"),
        where("company", "==", "DHD"),
        orderBy("wilaya", "asc")
      );
      const querySnapshot = await getDocs(q);
      const data: StopDesk[] = [];
      querySnapshot.forEach((docSnap) => {
        const docData = docSnap.data();
        data.push({
          id: docSnap.id,
          name: docData.name || "",
          adress: docData.adress || docData.adresse || "",
          adresse: docData.adresse || docData.adress || "",
          wilaya: docData.wilaya || "",
          wilayaId: docData.wilayaId || 0,
          code_wilaya: docData.code_wilaya || "",
          commune: docData.commune || "",
          company: docData.company || "DHD",
          phone: docData.phone || "",
          phone2: docData.phone2 || "",
          map: docData.map || "",
          iframeMap: docData.iframeMap || "",
          desk_url_code: docData.desk_url_code || docSnap.id,
          stopdesk_code: docData.stopdesk_code || docSnap.id,
          lng: docData.lng || "ar",
          hub_working_days: docData.hub_working_days || DEFAULT_WORKING_DAYS,
          updatedAt: docData.updatedAt?.toDate?.() || undefined,
        });
      });
      setStopdesks(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching stopdesks:", error);
      toast.error("Failed to load stopdesks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStopdesks();
  }, [fetchStopdesks]);

  const handleAdd = () => {
    const existingCodes = stopdesks.map((s) => s.stopdesk_code);
    const newCode = generateUniqueCode(existingCodes);
    setFormData(createEmptyStopDesk(newCode));
    setEditingStopdesk(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (stopdesk: StopDesk) => {
    setFormData({ ...stopdesk });
    setEditingStopdesk(stopdesk);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (stopdesk: StopDesk) => {
    setStopdeskToDelete(stopdesk);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!stopdeskToDelete) return;

    setSaving(true);
    try {
      await deleteDoc(doc(db, "EcoStop", stopdeskToDelete.id));
      setStopdesks((prev) => prev.filter((s) => s.id !== stopdeskToDelete.id));
      toast.success("Stopdesk deleted successfully");
    } catch (error) {
      console.error("Error deleting stopdesk:", error);
      toast.error("Failed to delete stopdesk");
    } finally {
      setSaving(false);
      setIsDeleteDialogOpen(false);
      setStopdeskToDelete(null);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const docId = formData.stopdesk_code;
      const dataToSave = {
        ...formData,
        desk_url_code: docId,
        stopdesk_code: docId,
        updatedAt: Timestamp.now(),
      };

      // Remove the id field as it's the document ID
      const { id, ...saveData } = dataToSave;

      await setDoc(doc(db, "EcoStop", docId), saveData);

      if (editingStopdesk) {
        // If code changed, delete old document
        if (editingStopdesk.id !== docId) {
          await deleteDoc(doc(db, "EcoStop", editingStopdesk.id));
        }
        setStopdesks((prev) =>
          prev.map((s) =>
            s.id === editingStopdesk.id ? { ...formData, id: docId } : s
          )
        );
      } else {
        setStopdesks((prev) =>
          [...prev, { ...formData, id: docId }].sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      }

      toast.success(
        editingStopdesk
          ? "Stopdesk updated successfully"
          : "Stopdesk added successfully"
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving stopdesk:", error);
      toast.error("Failed to save stopdesk");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (field: keyof StopDesk, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Sync address fields - if one is updated, update both
      if (field === "adress" || field === "adresse") {
        updated.adress = value as string;
        updated.adresse = value as string;
      }

      // Sync code fields
      if (field === "stopdesk_code" || field === "desk_url_code") {
        updated.stopdesk_code = value as string;
        updated.desk_url_code = value as string;
      }

      // When wilaya changes, update related fields
      if (field === "wilayaId") {
        const wilaya = WILAYA_LIST.find((w) => w.id === value);
        if (wilaya) {
          updated.wilaya = wilaya.name;
          updated.code_wilaya = String(wilaya.id);
        }
      }

      return updated;
    });
  };

  const handleMapChange = (value: string) => {
    const iframeUrl = convertToIframeUrl(value);
    setFormData((prev) => ({
      ...prev,
      map: value,
      iframeMap: iframeUrl,
    }));
  };
  const handleAddWorkingDay = () => {
    setFormData((prev) => ({
      ...prev,
      hub_working_days: [
        ...prev.hub_working_days,
        {
          day: "",
          openTime: "09:00",
          closeTime: "17:00",
        },
      ],
    }));
  };
  const handleRemoveWorkingDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hub_working_days: prev.hub_working_days.filter((_, i) => i !== index),
    }));
  };
  const handleWorkingDayChange = (
    index: number,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      hub_working_days: prev.hub_working_days.map((day, i) =>
        i === index ? { ...day, [field]: value } : day
      ),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">
            DHD Stopdesk Management
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchStopdesks}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Stopdesk
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, code, wilaya, commune, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Wilaya</TableHead>
                  <TableHead>Commune</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStopdesks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      {searchQuery
                        ? "No stopdesks match your search."
                        : "No stopdesks found. Click \"Add Stopdesk\" to create one."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStopdesks.map((stopdesk) => (
                    <TableRow key={stopdesk.id}>
                      <TableCell className="font-mono font-medium">
                        {stopdesk.stopdesk_code}
                      </TableCell>
                      <TableCell>{stopdesk.name}</TableCell>
                      <TableCell>{stopdesk.wilaya}</TableCell>
                      <TableCell>{stopdesk.commune}</TableCell>
                      <TableCell>{stopdesk.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(stopdesk)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(stopdesk)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredStopdesks.length} of {stopdesks.length} stopdesk{stopdesks.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingStopdesk ? "Edit Stopdesk" : "Add New Stopdesk"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6 pb-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stopdesk_code">Code (3 characters)</Label>
                    <Input
                      id="stopdesk_code"
                      value={formData.stopdesk_code}
                      onChange={(e) =>
                        handleFieldChange(
                          "stopdesk_code",
                          e.target.value.toUpperCase().slice(0, 3)
                        )
                      }
                      maxLength={3}
                      className="font-mono"
                      disabled={!!editingStopdesk}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      placeholder="Enter stopdesk name"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold">Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wilaya">Wilaya</Label>
                    <Select
                      value={formData.wilayaId ? String(formData.wilayaId) : ""}
                      onValueChange={(value) =>
                        handleFieldChange("wilayaId", parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select wilaya" />
                      </SelectTrigger>
                      <SelectContent>
                        {WILAYA_LIST.map((wilaya) => (
                          <SelectItem key={wilaya.id} value={String(wilaya.id)}>
                            {wilaya.id} - {wilaya.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commune">Commune</Label>
                    <Input
                      id="commune"
                      value={formData.commune}
                      onChange={(e) =>
                        handleFieldChange("commune", e.target.value)
                      }
                      placeholder="Enter commune"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">Address</Label>
                  <Input
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => handleFieldChange("adresse", e.target.value)}
                    placeholder="Enter full address"
                  />
                  <p className="text-xs text-muted-foreground">
                    Both adress and adresse fields will be saved with this value
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone 1</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      placeholder="0551671163"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone2">Phone 2</Label>
                    <Input
                      id="phone2"
                      value={formData.phone2}
                      onChange={(e) => handleFieldChange("phone2", e.target.value)}
                      placeholder="0660292370"
                    />
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Map Location
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="map">Google Maps Link</Label>
                  <Input
                    id="map"
                    value={formData.map}
                    onChange={(e) => handleMapChange(e.target.value)}
                    placeholder="https://maps.app.goo.gl/xxxxx or paste any Google Maps URL"
                  />
                  <p className="text-xs text-muted-foreground">
                    Paste a Google Maps short link - the iframe URL will be generated automatically
                  </p>
                </div>
                {formData.iframeMap && (
                  <div className="space-y-2">
                    <Label>Map Preview</Label>
                    <div className="rounded-md overflow-hidden border">
                      <iframe
                        src={formData.iframeMap}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Working Hours */}
              <div className="space-y-4">
  <h3 className="font-semibold flex items-center gap-2">
    <Clock className="h-4 w-4" />
    Working Hours
  </h3>

  <div className="space-y-3">
    {formData.hub_working_days.map((day, index) => (
      <div key={index} className="flex items-center gap-3 text-sm">
        
        {/* Day name input */}
        <Input
          value={day.day}
          onChange={(e) =>
            setFormData((prev) => {
              const updated = [...prev.hub_working_days];
              updated[index].day = e.target.value;
              return { ...prev, hub_working_days: updated };
            })
          }
          placeholder="Day name (e.g. Monday)"
          className="w-40"
        />

        {/* Open time */}
        <Select
          value={day.openTime}
          onValueChange={(value) =>
            handleWorkingDayChange(index, "openTime", value)
          }
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span>to</span>

        {/* Close time */}
        <Select
          value={day.closeTime}
          onValueChange={(value) =>
            handleWorkingDayChange(index, "closeTime", value)
          }
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Remove button */}
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveWorkingDay(index)}
        >
          Remove
        </Button>
      </div>
    ))}
  </div>

  {/* Add button */}
  <Button
    type="button"
    variant="outline"
    onClick={handleAddWorkingDay}
  >
    + Add Working Day
  </Button>
</div>

              {/* Language */}
              <div className="space-y-4">
                <h3 className="font-semibold">Language</h3>
                <div className="space-y-2">
                  <Label htmlFor="lng">Default Language</Label>
                  <Select
                    value={formData.lng}
                    onValueChange={(value) => handleFieldChange("lng", value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
</div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stopdesk</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{stopdeskToDelete?.name}&quot; (
              {stopdeskToDelete?.stopdesk_code})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {saving ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
