"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "next/navigation";
import {
  PAYMENT_STATUS_LABELS,
  PaymentsService,
} from "@/services/payments.service";
import type {
  CreatePaymentInput,
  PaymentStatus,
} from "@/services/payments.service";
import { getErrorMessage } from "@/services/api";

type PaymentRecord = {
  id?: string | number;
  amount?: number;
  currency?: string;
  status?: number | string;
  gateway?: string;
  gatewayRef?: string;
  createdAt?: string;
  booking?: { id?: string | number; [key: string]: unknown };
};

const toPaymentList = (payload: unknown): PaymentRecord[] => {
  if (Array.isArray(payload)) return payload as PaymentRecord[];
  if (payload && typeof payload === "object") {
    const value = payload as { data?: unknown; items?: unknown };
    if (Array.isArray(value.data)) return value.data as PaymentRecord[];
    if (Array.isArray(value.items)) return value.items as PaymentRecord[];
    if (value.data && typeof value.data === "object") {
      const nested = value.data as { items?: unknown; payments?: unknown };
      if (Array.isArray(nested.items)) return nested.items as PaymentRecord[];
      if (Array.isArray(nested.payments)) return nested.payments as PaymentRecord[];
    }
  }
  return [];
};

const getStatusLabel = (status: PaymentRecord["status"]) => {
  const code = Number(status);
  return code in PAYMENT_STATUS_LABELS
    ? PAYMENT_STATUS_LABELS[code as PaymentStatus]
    : "Naməlum status";
};

export default function BookingPaymentPage() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = String(params.bookingId ?? "");
  const [gateway, setGateway] = useState("");
  const [gatewayRef, setGatewayRef] = useState("");
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<PaymentRecord | null>(null);
  const [detailLoading, setDetailLoading] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadPayments = useCallback(async () => {
    if (!bookingId) return;
    try {
      const response = await PaymentsService.getBookingPayments(bookingId);
      setPayments(toPaymentList(response.data));
      setError("");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    void loadPayments();
  }, [loadPayments]);

  const createPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!gateway.trim()) {
      setError("Ödəniş provayderini daxil edin.");
      return;
    }

    const payload: CreatePaymentInput = {
      gateway: gateway.trim(),
      ...(gatewayRef.trim() ? { gatewayRef: gatewayRef.trim() } : {}),
    };

    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      await PaymentsService.createPayment(bookingId, payload);
      setNotice("Ödəniş sorğusu yaradıldı.");
      setGatewayRef("");
      await loadPayments();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const showPaymentDetails = async (id: string | number) => {
    setDetailLoading(String(id));
    setError("");
    try {
      const response = await PaymentsService.getPayment(String(id));
      const payload = response.data as { data?: PaymentRecord } | PaymentRecord;
      const paymentData =
        payload && typeof payload === "object" && "data" in payload
          ? payload.data
          : payload;
      setPaymentDetails(
        paymentData ? (paymentData as PaymentRecord) : null,
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
      setPaymentDetails(null);
    } finally {
      setDetailLoading("");
    }
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold text-[#142A12]">Ödəniş</h1>
        <p className="mt-2 text-zinc-600">Booking № {bookingId}</p>
        <p className="mt-1 text-sm text-zinc-500">
          Məbləğ və valyuta booking məlumatlarına əsasən avtomatik hesablanır.
        </p>
      </header>

      <form onSubmit={createPayment} className="space-y-4 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Ödəniş sorğusu yarat</h2>
        <label className="block space-y-1 text-sm font-medium">
          Gateway
          <input
            value={gateway}
            onChange={(event) => setGateway(event.target.value)}
            className="w-full rounded-lg border px-3 py-2 font-normal"
            placeholder="Ödəniş provayderi"
            required
          />
        </label>
        <label className="block space-y-1 text-sm font-medium">
          Gateway reference <span className="font-normal text-zinc-500">(istəyə bağlı)</span>
          <input
            value={gatewayRef}
            onChange={(event) => setGatewayRef(event.target.value)}
            className="w-full rounded-lg border px-3 py-2 font-normal"
            placeholder="Provayder əməliyyatının ID-si"
          />
        </label>
        <button
          type="submit"
          disabled={submitting || !bookingId}
          className="rounded-lg bg-[#142A12] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Göndərilir..." : "Ödənişə keç"}
        </button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}
      </form>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#142A12]">Ödəniş tarixçəsi</h2>
        {loading ? (
          <p className="text-zinc-500">Ödənişlər yüklənir...</p>
        ) : payments.length ? (
          payments.map((payment, index) => (
            <article
              key={payment.id ?? `${payment.gatewayRef ?? "payment"}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
            >
              <div>
                <p className="font-semibold">{getStatusLabel(payment.status)}</p>
                <p className="text-sm text-zinc-500">
                  {payment.gateway || "Ödəniş"}{payment.gatewayRef ? ` · ${payment.gatewayRef}` : ""}
                </p>
                {payment.id !== undefined && (
                  <button
                    type="button"
                    onClick={() => void showPaymentDetails(payment.id!)}
                    className="mt-1 text-sm font-medium text-blue-700 underline"
                  >
                    {detailLoading === String(payment.id) ? "Yüklənir..." : "Detalları göstər"}
                  </button>
                )}
              </div>
              <p className="font-semibold">
                {payment.amount ?? "—"} {payment.currency ?? ""}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-xl border p-4 text-zinc-500">Bu booking üçün ödəniş qeydi yoxdur.</p>
        )}
        {paymentDetails && (
          <article className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
            <p><strong>Ödəniş ID-si:</strong> {paymentDetails.id}</p>
            <p><strong>Booking ID-si:</strong> {paymentDetails.booking?.id ?? bookingId}</p>
            <p><strong>Status:</strong> {getStatusLabel(paymentDetails.status)}</p>
            <p><strong>Məbləğ:</strong> {paymentDetails.amount ?? "—"} {paymentDetails.currency ?? ""}</p>
          </article>
        )}
      </section>
    </main>
  );
}
